var coap = require('coap');
var zcl = require('../.')(coap);

var deviceIp = '::1';
var deviceUid = 'P7BU0eh27b2f5f0IC0GLL7uHum';
var devicePort = 5683;
var clusterEndpoint = 1;

var onOff = zcl.clusters.OnOff({
  ip: deviceIp,
  endpoint: clusterEndpoint
});

onOff.bind({
  uid: deviceUid,
  port: devicePort,
  endpoint: clusterEndpoint
}, (err, response) => {
  if (err) {
    console.error(err);
  }

  console.log(response.code);
});

