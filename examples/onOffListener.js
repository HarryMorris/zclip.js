var coap = require('coap');
var coapServer = coap.createServer();
var zcl = require('../zcl')(coap);

var onOffServerCluster = new zcl.OnOffCluster({
  ip: '127.0.0.1',
  endpoint: 1
});

onOffServerCluster.on('on', function() {
  console.log('Recieved on command');
});

onOffServerCluster.on('off', function() {
  console.log('Recieved on command');
});

onOffServerCluster.listen(coapServer);

coapServer.listen(function() {
  console.log('Coap server listening on 5683');

  var on = true;

  setInterval(function() {
    (on ? onOffServerCluster.off : onOffServerCluster.on)();
  }, 500);
});

