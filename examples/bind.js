var coap = require('coap');
var zcl = require('../.')(coap);

var onOff = new zcl.clusters.OnOff({
  ip: '2001::1',
  endpoint: 1
});

onOff.bind({
  destinationIp: '2001::2'
  endpoint: 1,
  reportId: null
});

