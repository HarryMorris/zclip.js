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
      printErrorAndExit(cli, 'Error: Cluster not found');
      return;
    }

    var cluster = new Cluster({
      ip: ip,
      port: zclCommand.options.port,
      endpoint: zclCommand.options.endpoint
    });

    if (!cluster[commandName]) {
      printErrorAndExit(cli, 'Error: Command not found');
      return;
    }

    if (!ip) {
      printErrorAndExit(cli, 'Error: IP required');
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

  function printErrorAndExit(cli, error) {
    cli.printError(error + '\n');
    printUsage(cli);
    cli.exit(1);
  }

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl cmd <clusterName> <commandName> [args]\n';
    var example = 'Example:\n  zcl cmd level moveToLevel --level 0 --transitionTime 0\n';
    cli.print(usage);
    cli.print(example);
  }
}
