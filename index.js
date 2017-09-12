var path = require('path');

global.__appRoot = path.resolve(__dirname) + '/';

module.exports = function(coap) {
  var config = {};
  var zclip = {
    SERVER: 's',
    CLIENT: 'c'
  };

  var clusterMetaData = require(__appRoot + 'lib/clusterMetaData')(config);
  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData, coap);
  clusters.build(zclip);

  zclip.discover = require(__appRoot + 'lib/discover')(coap, zclip);


  return zclip;
}
