var pascalCase = require(__appRoot + 'lib/util/pascalCase');

module.exports = function(deviceMetaData) {
  var devices = {};

  devices.build = function(deviceId, attrs) {
    var metaData = deviceMetaData[deviceId];

    if (!metaData) return new UnknownDevice(attrs);

    return new Device({
      name: pascalCase(metaData.name),
      ip: attrs.ip,
      profileId: deviceId,
      clusterId: attrs.clusterId,
      clusterSide: attrs.clusterSide
    });
  };

  return devices;

  function Device(attrs) {
    Object.assign(this, attrs);
  }

  function UnknownDevice(attrs) {
    Object.assign(this, attrs);
    this.name = 'Unknown';
  }
}
