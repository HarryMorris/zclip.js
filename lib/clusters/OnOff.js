var cbor = require('cbor');

module.exports = function(clusters, coap) {
  if (!clusters.OnOff) {
    console.log('Expected OnOff on', clusters);
  }
}
