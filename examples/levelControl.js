var coap = require('coap');
var zcl = require('../.')(coap);

var levelControlCluster = new zcl.LevelControlCluster({
  ip: '127.0.0.1',
  endpoint: 1
});

levelControlCluster.moveToLevel({
  level: 200,
  transitionTime: 1000
});

