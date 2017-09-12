var fs = require('fs');

var CLUSTER_DIR = 'lib/clusters/';
var ClusterBase = require(__appRoot + 'lib/ClusterBase');

module.exports = function(clusterMetaData, coap) {
  return {
    build: function(target) {

      // Build clusters from metadata
      Object.getOwnPropertyNames(clusterMetaData).forEach(function(clusterCode) {
        var currentClusterMetaData = clusterMetaData[clusterCode];
        var clusterName = currentClusterMetaData["name"].replace(/\s/g, '') + 'Cluster';

        target[clusterName] = function(attrs) {
          attrs = attrs || {};

          this.ip = attrs.ip;
          this.port = attrs.port;
          this.endpoint = attrs.endpoint;

          this.basePath = '/zcl/e/' + this.endpoint + '/';
        }

        target[clusterName].prototype = new ClusterBase(currentClusterMetaData, coap);
      });

      // Add overrides defined in clusters dir
      var files = fs.readdirSync(__appRoot + CLUSTER_DIR);
      files.forEach(function(fileName) {
        require(__appRoot + CLUSTER_DIR + fileName)(target, coap);
      });
    }
  }
}
