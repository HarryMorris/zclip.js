var coap = require('coap');
var zcl = require('../.')(coap);

var onOffCluster = new zcl.clusters.OnOffCluster({
  ip: '2001:db8:385:9318:db95:a7b8:e803:73af',
  endpoint: 1
});

setTimeout(function() {
  console.log('Sending on');
  onOffCluster.on();
}, 0);

setTimeout(function() {
  console.log('Sending off');
  onOffCluster.off();
}, 1000);

setTimeout(function() {
  console.log('Sending toggle');
  onOffCluster.toggle();
}, 2000);

setTimeout(function() {
  console.log('Sending off');
  onOffCluster.off();
}, 3000);

