var coap = require('coap');
var zclip = require('../.')(coap);

var rd = zclip.RD({ ip: '::1', port: 5685 });

var deviceUid = 'P7BU0eh27b2f5f0IC0GLL7uHum';

// lookup device by uid

rd.lookup({
  uid: deviceuid
}, (err, devices) => {
  console.log(devices[0].ip);
});

// lookup clusters

rd.lookup({
  clusterId: '6',
  clusterSide: 's'
}, (err, devices) => {
  console.log(devices[0].name);
  console.log(devices[0].cluster);
  console.log(devices[0].clusterSide);
  console.log(devices[0].ip);
  console.log(devices[0].uid);
});

