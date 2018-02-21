var coap = require('coap');
var zclip = require('../.')(coap);

var deviceIp = '2001:db8:385:9318:344f:e8e2:ce9f:e933';
var clusterEndpoint = 1;

var levelControl= zclip.clusters.LevelControl({
  ip: deviceIp,
  endpoint: clusterEndpoint
});

console.log('Moving to level 0');

levelControl.moveToLevel({
  level: 0,
  transitionTime: 0
}, commandCallback);

setTimeout(() => {
  console.log('Moving to level 255');

  levelControl.moveToLevel({
    level: 255,
    transitionTime: 0
  }, commandCallback);
}, 2000);

function commandCallback(err, response) {
  if (err)
    console.error(err);

  console.log(response.code);
}

