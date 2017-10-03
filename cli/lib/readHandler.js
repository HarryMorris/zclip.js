var _ = require('lodash');

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var clusterName = _.pascalCase(zclCommand.keywords[1]);
    var ip = zclCommand.keywords[2];

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      printUsage(cli);
      printAvailableOptions(cli, _.keys(zclip.clusters).sort());
      cli.exit(1);
      return;
    }

    var cluster = new Cluster({
      ip: ip,
      port: zclCommand.options.port,
      endpoint: zclCommand.options.endpoint
    });

    if (!ip) {
      printUsage(cli);
      cli.exit(1);
      return;
    }

    cluster.read(zclCommand.options, function(err, result) {
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

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl read <cluster> <ip>\n';
    cli.print(usage);
  }

  function printAvailableOptions(cli, options) {
    cli.print('Available clusters:');
    options.forEach(function(option) {
      cli.print(cli.TAB + camelcase(option));
    });
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }
}

