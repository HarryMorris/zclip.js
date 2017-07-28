var cbor = require('cbor');

module.exports = function(coap) {
  function LevelControlCluster(attrs) {
    this.ip = attrs.ip;
    this.port = attrs.port;
    this.endpoint = attrs.endpoint;
  }

  LevelControlCluster.prototype.moveToLevel = function(attrs) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s8/c/0`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    var payload = new Map();
    payload.set(0, attrs.level);
    payload.set(1, attrs.transitionTime || 0xFFFF);

    var encodedPayload = cbor.encode(payload);
    request.write(encodedPayload);

    request.end();
  }

  return LevelControlCluster;
}

