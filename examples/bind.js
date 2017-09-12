var coap = require('coap');
var zcl = require('../.')(coap);

var onOffCluster = new zcl.OnOffCluster({
  ip: '2001::1',
  endpoint: 1
});

onOffCluster.bind({
  destinationIp: '2001::2'
  endpoint: 1,
  reportId: null
});

