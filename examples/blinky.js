var coap = require('coap');
var zcl = require('../zcl')(coap);
var ip = process.argv[2] || "127.0.0.1"

var onOffCluster = new zcl.OnOffCluster({
  ip: ip,
  endpoint: 1
});

setInterval(function() {
  onOffCluster.toggle();
}, 500);


