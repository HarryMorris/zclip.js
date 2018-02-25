var util = require(__appRoot + 'lib/util')();

module.exports = function(zclip) {
  var clusters = {};
  var clustersById = {}
  var clustersByName = {}

  var ClusterFactory = require(__appRoot + 'lib/ClusterFactory')({ coap: zclip.coap });

  clusters.init = function(clusterMetaData) {
    Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterId) {
      var currentClusterMetaData = clusterMetaData[clusterId];
      var clusterName = util.pascalCase(currentClusterMetaData["name"]);

      clusters[clusterName] = ClusterFactory(currentClusterMetaData);

      clustersById[clusterId] = {
        meta: currentClusterMetaData
      }

      clustersByName[clusterName] = {
        clusterId: clusterId
      }
    });
  }

  clusters.findNameById = function(clusterId) {
    if (!clusterId) return;

    var name = clustersById[clusterId].meta.name;
    return zclip.util.pascalCase(name);
  };

  clusters.findClusterIdByName = function(clusterName) {

    var clusterNames = Object.getOwnPropertyNames(clustersByName);

    var foundClusterName = clusterNames.find((currentClusterName) => {
      return currentClusterName.toLowerCase() == clusterName.toLowerCase();
    });

    var clusterMatch = clustersByName[foundClusterName];

    if (clusterMatch) {
      return clusterMatch.clusterId;
    }
  }

  clusters.clusterNames = function() {
    return Object.getOwnPropertyNames(clustersByName);
  };

  return clusters;
}

