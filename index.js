var zclip = {};
var config = {};

var clusterMetaData = require(__appRoot + 'lib/clusterMetaData')(config);
var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);
clusters.build(zclip);

module.exports = zclip;
