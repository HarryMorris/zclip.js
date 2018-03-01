var fs = require('fs');

var util = require(__zclipRoot + 'lib/util');

module.exports = new Clusters();

function Clusters() {
  this.clusters = {};
  this.clustersById = {};
  this.clustersByName = {};
}

Clusters.prototype.init = function(file, coap) {
  this.meta = JSON.parse(fs.readFileSync(file));

  var ClusterFactory = require(__zclipRoot + 'lib/ClusterFactory')({ coap: coap });

  Object.getOwnPropertyNames(this.meta).forEach((clusterId) => {
    var currentClusterMetaData = this.meta[clusterId];
    var clusterName = util.pascalCase(currentClusterMetaData["name"]);

    this[clusterName] = ClusterFactory(currentClusterMetaData);

    this.clustersById[clusterId] = {
      meta: currentClusterMetaData
    }

    this.clustersByName[clusterName] = {
      clusterId: clusterId
    }
  });
}

Clusters.prototype.findNameById = function(clusterId) {
  if (!clusterId) return;

  var name = this.clustersById[clusterId].meta.name;
  return util.pascalCase(name);
};

Clusters.prototype.findClusterIdByName = function(clusterName) {

  var clusterNames = Object.getOwnPropertyNames(this.clustersByName);

  var foundClusterName = clusterNames.find((currentClusterName) => {
    return currentClusterName.toLowerCase() == clusterName.toLowerCase();
  });

  var clusterMatch = this.clustersByName[foundClusterName];

  if (clusterMatch) {
    return clusterMatch.clusterId;
  }
}

Clusters.prototype.clusterNames = function() {
  return Object.getOwnPropertyNames(this.clustersByName);
};

