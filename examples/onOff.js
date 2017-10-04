var coap = require('coap');
var zcl = require('../.')(coap);

var onOff = new zcl.clusters.OnOff({
  ip: '2001:db8:385:9318:f001:951a:2aa1:cbf7',
  endpoint: 1
});

setTimeout(function() {
  console.log('Sending on');
  onOff.on();
}, 0);

setTimeout(function() {
  console.log('Sending off');
  onOff.off();
}, 1000);

setTimeout(function() {
  console.log('Sending toggle');
  onOff.toggle();
}, 2000);

setTimeout(function() {
  console.log('Sending off');
  onOff.off();
}, 3000);

