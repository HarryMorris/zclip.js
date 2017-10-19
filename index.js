var path = require('path');
var fs = require('fs');

global.__appRoot = path.resolve(__dirname) + '/';

require(__appRoot + 'polyfills');

var clusterMetaDataFile = __appRoot + 'clusterMetaData.json';
var clusterMetaData = JSON.parse(fs.readFileSync(clusterMetaDataFile));

module.exports = function(coap) {
  var config = {};
  var zclip = {
    SERVER: 's',
    CLIENT: 'c'
  };

  zclip.discover = require(__appRoot + 'lib/discover')(coap, zclip);
  zclip.clusters = require(__appRoot + 'lib/clusters')(clusterMetaData, coap);
  zclip.util = require(__appRoot + 'lib/util')();

  return zclip;
}

