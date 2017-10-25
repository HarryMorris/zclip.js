var coap = require('coap');
var zclip = require('../.')(coap);

// Create an on/off server
var onOffServer = new zclip.clusters.OnOff({
  endpoint: 1
});

onOffServer.commandReceived('toggle', function(request, response) {
  console.log('Toggle command received');
});

onOffServer.commandReceived('on', function(request, response) {
  console.log('On command received');
});

onOffServer.commandReceived('off', function(request, response) {
  console.log('On command received');
});

// Create a coap server
var coapServer = coap.createServer();

coapServer.listen(function() {
  console.log('Coap server listening on 5683');

  onOffServer.listen(coapServer);

  // Create an on/off client
  var onOff = new zclip.clusters.OnOff({
    ip: '127.0.0.1',
    endpoint: 1
  });

  console.log("Sending toggle command");

  onOff.toggle(null, function() {
    console.log('Coap server closing');
    coapServer.close();
  });
});


