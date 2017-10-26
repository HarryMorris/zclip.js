var coap = require('coap');
var zclip = require('../.')(coap);

// Create a levelControl server
var levelControlServer = new zclip.clusters.LevelControl({
  endpoint: 1
});

levelControlServer.commandReceived('moveToLevel', function(request, response) {
  console.log('MoveToLevel command received');
  console.log('Level:', request.level);
  console.log('Transition Time:', request.transitionTime);
});

// Create a coap server
var coapServer = coap.createServer();

coapServer.listen(function() {
  console.log('Coap server listening on 5683');

  levelControlServer.listen(coapServer);

  // Create an levelControl client
  var levelControl = new zclip.clusters.LevelControl({
    ip: '127.0.0.1',
    endpoint: 1
  });

  console.log("Sending moveToLevel command");

  levelControl.moveToLevel({ level: '99', transitionTime: '0' }, function() {
    console.log('Coap server closing');
    coapServer.close();
  });
});


