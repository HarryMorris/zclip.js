var coap = require('coap');
var zclip = require('../.')(coap);

var levelControl= new zclip.clusters.LevelControl({
  ip: '2001:db8:385:9318:4401:5dc1:9b2c:4743',
  endpoint: 1
});

console.log('Moving to level 0');

levelControl.moveToLevel({
  level: 0,
  transitionTime: 0
});

setTimeout(function() {
  console.log('Moving to level 255');

  levelControl.moveToLevel({
    level: 255,
    transitionTime: 0
  });
}, 2000);


