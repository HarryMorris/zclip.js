var _ = require('lodash');

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var clusterName = _.pascalCase(zclCommand.keywords[1]);
    var commandName = zclCommand.keywords[2];
    var ip = zclCommand.keywords[3];

    if (clusterName.indexOf('Cluster') == -1) {
      clusterName = clusterName + 'Cluster';
    }

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      printErrorAndUsage(cli, 'Error: Cluster not found');
      printAvailableOptions(cli, _.keys(zclip.clusters).sort());
      cli.exit(1);
      return;
    }

    var cluster = new Cluster({
      ip: ip,
      port: zclCommand.options.port,
      endpoint: zclCommand.options.endpoint
    });

    if (!cluster[commandName]) {
      printErrorAndUsage(cli, 'Error: Command not found');

      var commandNames = _.map(Object.getOwnPropertyNames(cluster.meta.commands), function(commandId) {
        return cluster.meta.commands[commandId].name;
      });

      printAvailableOptions(cli, commandNames.sort());
      cli.exit(1);
      return;
    }

    if (!ip) {
      printErrorAndUsage(cli, 'Error: IP required');
      cli.exit(1);
      return;
    }

    cluster[commandName](zclCommand.options, function(err, result) {
      if (err) {
        cli.printError(err.message);
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
  }

  function printErrorAndUsage(cli, error) {
    printUsage(cli);
    cli.printError(error + '\n');
  }

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl cmd <clusterName> <commandName> [args]\n';
    var example = 'Example:\n  zcl cmd level moveToLevel --level 0 --transitionTime 0\n';
    cli.print(usage);
    cli.print(example);
  }

  function printAvailableOptions(cli, options) {
    cli.print('Available Options:');
    options.forEach(function(option) {
      cli.print(cli.TAB + camelcase(option));
    });
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }
}

