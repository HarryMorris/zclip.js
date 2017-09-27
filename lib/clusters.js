var fs = require('fs');
var _ = require('lodash');
_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

var CLUSTER_DIR = 'lib/clusters/';
var ClusterBase = require(__appRoot + 'lib/ClusterBase')();

module.exports = function(clusterMetaData, coap) {
  var clusters = {};

  // Build clusters from metadata
  Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterCode) {
    var currentClusterMetaData = clusterMetaData[clusterCode];
    var clusterName = _.pascalCase(currentClusterMetaData["name"]);

    clusters[clusterName] = require(__appRoot + 'lib/Cluster')();
    clusters[clusterName].prototype = new ClusterBase(currentClusterMetaData, coap);
  });

  // Add overrides defined in clusters dir
  var files = fs.readdirSync(__appRoot + CLUSTER_DIR);
  files.forEach(function(fileName) {
    require(__appRoot + CLUSTER_DIR + fileName)(clusters, coap);
  });

  return clusters;
}

