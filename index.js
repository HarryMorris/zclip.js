var path = require('path');

global.__appRoot = path.resolve(__dirname) + '/';

module.exports = function(coap) {
  var zclip = {};
  var config = {};

  var clusterMetaData = require(__appRoot + 'lib/clusterMetaData')(config);
  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData, coap);
  clusters.build(zclip);

  return zclip;
}
