var fs = require('fs');
var pascalCase = require(__appRoot + 'lib/util/pascalCase');

module.exports = new Devices();

function Devices() {
  this.meta = {};
}

Devices.prototype.init = function(file) {
  this.meta = JSON.parse(fs.readFileSync(file));
}

Devices.prototype.build = function(deviceId, attrs) {
  var deviceMeta = this.meta[deviceId];

  if (!deviceMeta) return new UnknownDevice(attrs);

  return new Device({
    name: pascalCase(deviceMeta.name),
    ip: attrs.ip,
    profileId: deviceId,
    clusterId: attrs.clusterId,
    clusterSide: attrs.clusterSide,
    cluster: attrs.cluster,
    uid: attrs.uid
  });
};

function Device(attrs) {
  Object.assign(this, attrs);
}

function UnknownDevice(attrs) {
  Object.assign(this, attrs);
  this.name = 'Unknown';
}
