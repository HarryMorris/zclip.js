var path = require('path');
var fs = require('fs');

global.__appRoot = path.resolve(__dirname) + '/';

require(__appRoot + 'polyfills');

module.exports = function(coap) {
  var zclip = {};

  zclip.SERVER = 's';
  zclip.CLIENT = 'c';

  zclip.clusters = require(__appRoot + 'lib/clusters');
  zclip.devices = require(__appRoot + 'lib/devices');
  zclip.discover = require(__appRoot + 'lib/discover')(coap);
  zclip.util = require(__appRoot + 'lib/util');

  zclip.DiscoverResponse = require(__appRoot + 'lib/DiscoverResponse');
  zclip.RD = require(__appRoot + 'lib/RD');

  zclip.clusters.init(__appRoot + 'clusterMetaData.json', coap);
  zclip.devices.init(__appRoot + 'deviceMetaData.json');

  return zclip;
}

function parseMetaData(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

