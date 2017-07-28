var coap = require('coap');
var zcl = require('../zcl')(coap);
var ip = process.argv[2] || "127.0.0.1"

var levelControlCluster = new zcl.LevelControlCluster({
  ip: ip,
  endpoint: 1
});

levelControlCluster.moveToLevel({
  level: 200,
  transitionTime: 1000
});

