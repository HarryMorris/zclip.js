var util = require(__appRoot + 'lib/util')();

var CLUSTER_DIR = 'lib/clusters/';
var ClusterBase = require(__appRoot + 'lib/ClusterBase')();

module.exports = function(zclip) {
  var clusters = {};
  var clustersByCode = {}

  clusters.init = function(clusterMetaData) {
    Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterCode) {
      var currentClusterMetaData = clusterMetaData[clusterCode];
      var clusterName = util.pascalCase(currentClusterMetaData["name"]);

      clusters[clusterName] = require(__appRoot + 'lib/Cluster')();
      clusters[clusterName].prototype = new ClusterBase(currentClusterMetaData, zclip.coap);

      clustersByCode[clusterCode] = clusters[clusterName];
    });
  }

  clusters.find = function(clusterCode) {
    return clustersByCode[clusterCode];
  };

  return clusters;
}

