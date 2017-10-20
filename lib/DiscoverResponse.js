module.exports = function(devices) {
  var deviceIdRegEx = /ze=urn:zcl:d.([a-fA-F0-9]+)./;

  return function(coapResponse) {
    if (!coapResponse.payload) return;

    var deviceIdMatch = deviceIdRegEx.exec(coapResponse.payload.toString());

    if (!deviceIdMatch) return;

    var deviceId = deviceIdMatch[1];

    this.device = devices.build(deviceId, {
      ip: coapResponse.rsinfo.address
    });
  }
}

