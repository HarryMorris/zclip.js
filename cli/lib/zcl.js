var _ = require('lodash');

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = function(zclip) {
  return function(keywords, options, callback) {
    var clusterName = _.pascalCase(keywords[1]);
    var commandName = keywords[2];
    var ip = keywords[3];

    if (clusterName.indexOf('Cluster') == -1) {
      clusterName = clusterName + 'Cluster';
    }

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      callback(clusterName + ' not found', null, 1);
      return;
    }

    var cluster = new Cluster({
      ip: ip,
      port: options.port,
      endpoint: options.endpoint
    });

    if (!cluster[commandName]) {
      callback('Command ' + commandName + ' not found for cluster ' + clusterName, null, 1);
      return;
    }

    if (!ip) {
      callback('Ip not provided', null, 1);
      return;
    }

    cluster[commandName](options, function(err, result) {
      var resultStr = result.responseCode + ' ';

      if (result.response) {
        resultStr = resultStr + JSON.stringify(result.response);
      } else {
        resultStr = resultStr + 'Empty response';
      }

      callback(err, resultStr, 0)
    });
  }
}
