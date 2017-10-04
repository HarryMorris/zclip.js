var util = require(__appRoot + 'lib/util')();

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var clusterName = util.pascalCase(zclCommand.keywords[1]);
    var ip = zclCommand.keywords[2];

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      printUsage(cli);
      printAvailableOptions(cli, clusterNames());
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
      cli.print(cli.TAB + util.camelCase(option));
    });
  }

  function clusterNames() {
    var clusterNames = [];
    for (var clusterName in clusters) clusterNames.push(clusterName);
    return clusterNames.sort();
  }
}

