var coap = require('coap');
var coapServer = coap.createServer();

coapServer.listen(function() {
  console.log('Coap server listening on 5683');
});

var zcl = require('../.')(coap);

var levelControlCluster = new zcl.LevelControlCluster({
  ip: '127.0.0.1',
  endpoint: 1
});

levelControlCluster.on('moveToLevel', function(request, response) {
  console.log('Recieved moveToLevel command');

  console.log('Level: ', request.level);
  console.log('Transition time: ', request.transitionTime);

  response.send();
});

levelControlCluster.listen(coapServer);

// Send moveToLevel to itself

levelControlClusterFoo.moveToLevel({
  level: 100,
  transitionTime: 1000
});

