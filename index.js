var path = require('path');
var fs = require('fs');

global.__zclipRoot = path.resolve(__dirname) + '/';

require(__zclipRoot + 'polyfills');

module.exports = function(coap) {
  var zclip = {};

  zclip.SERVER = 's';
  zclip.CLIENT = 'c';

  zclip.clusters = require(__zclipRoot + 'lib/clusters');
  zclip.devices = require(__zclipRoot + 'lib/devices');
  zclip.discover = require(__zclipRoot + 'lib/discover')(coap);
  zclip.util = require(__zclipRoot + 'lib/util');

  zclip.DiscoverResponse = require(__zclipRoot + 'lib/DiscoverResponse');
  zclip.RD = require(__zclipRoot + 'lib/RD');

  zclip.clusters.init(__zclipRoot + 'clusterMetaData.json', coap);
  zclip.devices.init(__zclipRoot + 'deviceMetaData.json');

  return zclip;
}

function parseMetaData(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

