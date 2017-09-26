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
      cli.printError(clusterName + ' cluster not found');
      cli.exit(1);
      return;
    }

    var cluster = new Cluster({
      ip: ip,
      port: zclCommand.options.port,
      endpoint: zclCommand.options.endpoint
    });

    if (!cluster[commandName]) {
      cli.printError('Command ' + commandName + ' not found for cluster ' + clusterName);
      cli.exit(1);
      return;
    }

    if (!ip) {
      cli.printError('IP not provided');
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
}

