module.exports = function(clusterMetaData) {
  return {
    build: function(target) {
      Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterCode) {
        var currentClusterMetaData = clusterMetaData[clusterCode];
        var name = currentClusterMetaData["name"];
        target[name.replace(/\s/g, '') + 'Cluster'] = {
          meta: currentClusterMetaData
        };
      });

    }
  }
}
