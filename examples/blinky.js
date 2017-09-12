var coap = require('coap');
var zcl = require('../.')(coap);

var onOffCluster = new zcl.OnOffCluster({
  ip: '::1',
  endpoint: 1
});

setInterval(function() {
  onOffCluster.toggle();
}, 500);


