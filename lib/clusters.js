var Cluster = require(__appRoot + 'lib/Cluster');

module.exports = function(clusterMetaData) {
  return {
    build: function(target) {
      Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterCode) {
        var currentClusterMetaData = clusterMetaData[clusterCode];
        var clusterName = currentClusterMetaData["name"].replace(/\s/g, '') + 'Cluster';

        target[clusterName] = function() {};
        target[clusterName].prototype = new Cluster(currentClusterMetaData);
      });

    }
  }
}
