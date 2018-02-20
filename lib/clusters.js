var util = require(__appRoot + 'lib/util')();

var CLUSTER_DIR = 'lib/clusters/';
var ClusterBase = require(__appRoot + 'lib/ClusterBase')();

module.exports = function(zclip) {
  var clusters = {};
  var clustersById = {}

  clusters.init = function(clusterMetaData) {
    Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterId) {
      var currentClusterMetaData = clusterMetaData[clusterId];
      var clusterName = util.pascalCase(currentClusterMetaData["name"]);

      var Cluster = require(__appRoot + 'lib/Cluster')();
      Cluster.prototype = new ClusterBase(currentClusterMetaData, zclip);

      var ClusterConstructor = function(attrs) {
        return new Cluster(attrs);
      }

      clusters[clusterName] = ClusterConstructor;

      clustersById[clusterId] = {
        meta: currentClusterMetaData,
        constructor: ClusterConstructor
      }
    });
  }

  clusters.findNameById = function(clusterId) {
    if (!clusterId) return;

    var name = clustersById[clusterId].meta.name;
    return zclip.util.pascalCase(name);
  };

  return clusters;
}

