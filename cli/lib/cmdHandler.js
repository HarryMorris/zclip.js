var _ = require('lodash');

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var cmdCommand = new CmdCommand(zclip.clusters, zclCommand);
    cmdCommand.exec(cli);
  }
}

function CmdCommand(clusters, zclCommand, cli) {
  var clusterName = zclCommand.keywords[1];
  var commandName = zclCommand.keywords[2];
  var ip = zclCommand.keywords[3];
  var Cluster;
  var cluster;

  this.exec = function() {}

  this.init = function() {
    if (!clusterName) {
      this.noClusterName();
      return;
    }

    Cluster = clusters[_.pascalCase(clusterName)];

    if (!Cluster) {
      this.unknownCluster();
      return;
    }

    this.clusterFound(Cluster);
  }

  this.noClusterName = function() {
    this.exec = function(cli) {
      printUsage(cli);
      cli.print('Available clusters:');
      printList(cli, _.keys(clusters).sort());
      cli.exit(0);
    }
  }

  this.unknownCluster = function() {
    this.exec = function(cli) {
      printErrorAndUsage(cli, 'Error: Cluster not found');
      cli.print('Available clusters:');
      printList(cli, _.keys(clusters).sort());
      cli.exit(1);
    }
  }

  this.clusterFound = function() {
    cluster = new Cluster({
      ip: ip,
      port: zclCommand.options.port,
      endpoint: zclCommand.options.endpoint
    });

    if (!commandName) {
      this.noCommand();
      return;
    }

    if (!cluster[commandName]) {
      this.unknownCommand();
      return;
    }

    if (zclCommand.options.help) {
      this.commandHelp();
      return;
    }

    if (!ip) {
      this.noIp();
      return;
    }

    this.ready();
  }

  this.noCommand = function() {
    this.exec = function(cli) {
      printUsage(cli);
      cli.print('Available commands:');
      printList(cli, cluster.commandNames());
      cli.exit(0);
    }
  }

  this.unknownCommand = function() {
    this.exec = function(cli) {
      printErrorAndUsage(cli, 'Error: Command not found');
      cli.print('Available commands:');
      printList(cli, cluster.commandNames());

      cli.exit(1);
    }
  }

  this.commandHelp = function() {
    this.exec = function(cli) {
      printUsage(cli);
      cli.print('Required arguments:');
      printList(cli, cluster.argNames(commandName));
      cli.exit(0);
    }
  }

  this.noIp = function() {
    this.exec = function(cli) {
      printErrorAndUsage(cli, 'Error: IP required');
      cli.exit(1);
    }
  }

  this.ready = function() {
    this.exec = function(cli) {
      cluster[commandName](zclCommand.options, function(err, result) {
        if (err) {
          cli.printError('Error: ' + (err.message || err) + '\n');
          cli.exit(1);
          return;
        }

        var resultStr = result.responseCode + ' ';

        if (result.response) {
          resultStr = resultStr + JSON.stringify(result.response);
        } else {
          resultStr = resultStr + 'Empty response';
        }

        cli.print(resultStr);
        cli.exit(0);
      });
    };
  }

  this.init();

  function printErrorAndUsage(cli, error) {
    printUsage(cli);
    cli.printError(error + '\n');
  }

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl cmd <clusterName> <commandName> <ip> [args]\n';
    var example = 'Example:\n  zcl cmd levelControl moveToLevel ::1 --level 0 --transitionTime 0\n';
    cli.print(usage);
    cli.print(example);
  }

  function printList(cli, options) {
    options.forEach(function(option) {
      cli.print(cli.TAB + camelcase(option));
    });
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }
}

