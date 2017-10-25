var cbor = require('cbor');

module.exports = function(clusters, coap) {
  if (!clusters.OnOff) {
    console.log('Expected OnOff on', clusters);
  }

  clusters.OnOff.prototype.bind = function(attrs, callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: this.basePath + 'b'
    });

    request.on('response', (response) => {
      if (response.code == '2.01') {
        callback();
      } else {
        callback('Expected 2.01 response. Got', response.code);
      }
    });

    request.on('error', (e) => {
      callback(e);
    });

    var destinationUri = `coap://[${attrs.destinationIp}]:${attrs.destinationPort}/zcl/e/${attrs.endpoint}`
    var payload = { u: destinationUri };
    var encodedPayload = cbor.encode(payload);
    request.write(encodedPayload);

    request.end();
  }
}
