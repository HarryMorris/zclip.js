var pascalCase = require(__appRoot + 'lib/util/pascalCase');

module.exports = function(zclip) {
  var devices = {};

  devices.init = function(deviceMetaData) {
    devices._deviceMetaData = deviceMetaData;
  };

  devices.build = function(deviceId, attrs) {
    if (!devices._deviceMetaData || !deviceId) return new UnknownDevice(attrs);;

    var metaData = devices._deviceMetaData[deviceId];

    if (!metaData) return new UnknownDevice(attrs);

    return new Device({
      name: pascalCase(metaData.name),
      ip: attrs.ip,
      profileId: deviceId,
      clusterId: attrs.clusterId,
      clusterSide: attrs.clusterSide,
      cluster: attrs.cluster,
      uid: attrs.uid
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
