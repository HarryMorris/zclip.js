var path = require('path');
var fs = require('fs');

global.__appRoot = path.resolve(__dirname) + '/';

require(__appRoot + 'polyfills');

module.exports = function(coap) {
  var zclip = {};
  zclip.coap = coap;

  zclip.SERVER = 's';
  zclip.CLIENT = 'c';

  zclip.clusters = require(__appRoot + 'lib/clusters')(zclip);
  zclip.devices = require(__appRoot + 'lib/devices')(zclip);
  zclip.discover = require(__appRoot + 'lib/discover')(zclip);
  zclip.util = require(__appRoot + 'lib/util')(zclip);

  zclip.DiscoverResponse = require(__appRoot + 'lib/DiscoverResponse')(zclip);
  zclip.RD = require(__appRoot + 'lib/RD')(zclip);

  zclip.clusters.init(parseMetaData(__appRoot + 'clusterMetaData.json'));
  zclip.devices.init(parseMetaData(__appRoot + 'deviceMetaData.json'));

  return zclip;
}

function parseMetaData(filePath) {
  return JSON.parse(fs.readFileSync(filePath));
}

