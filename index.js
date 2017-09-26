var path = require('path');

global.__appRoot = path.resolve(__dirname) + '/';

module.exports = function(coap) {
  var config = {};
  var zclip = {
    SERVER: 's',
    CLIENT: 'c'
  };

  zclip.discover = require(__appRoot + 'lib/discover')(coap, zclip);
  zclip.meta = require(__appRoot + 'lib/clusterMetaData')(config);

  var clusters = require(__appRoot + 'lib/clusters')(zclip.meta, coap);
  clusters.build(zclip);

  return zclip;
}

