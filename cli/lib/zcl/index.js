var _ = require('lodash');

_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = function(clusters) {
  return function(keywords, options, callback) {
    var clusterName = _.pascalCase(keywords[0]);
    var commandName = keywords[1];
    var ip = keywords[2];

    var Cluster = clusters[clusterName];

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

    cluster[commandName](options);
    callback(null, 'Command Sent', 0);
  }
}
