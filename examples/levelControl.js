var coap = require('coap');
var zclip = require('../.')(coap);

var levelControl= new zclip.LevelControl({
  ip: '2001:db8:385:9318:db95:a7b8:e803:73af',
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


