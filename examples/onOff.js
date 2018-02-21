var coap = require('coap');
var zcl = require('../.')(coap);

var deviceIp = '2001:db8:385:9318:344f:e8e2:ce9f:e933';
var clusterEndpoint = 1;

var onOff = zcl.clusters.OnOff({
  ip: deviceIp,
  endpoint: clusterEndpoint
});

setTimeout(() => {
  console.log('Sending on');
  onOff.on({}, commandCallback);
}, 0);

setTimeout(() => {
  console.log('Sending off');
  onOff.off({}, commandCallback);
}, 1000);

setTimeout(() => {
  console.log('Sending toggle');
  onOff.toggle({}, commandcallback);
}, 2000);

setTimeout(() => {
  console.log('Sending off');
  onOff.off({}, commandCallback);
}, 3000);

function commandCallback(err, response) {
  if (err)
    console.error(err);

  console.log(response.code);
}

