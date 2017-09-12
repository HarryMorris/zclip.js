// Discover devices that implement a specified cluster
//
// Important: This should be run on the same link
// as your devices unless muticast forwarding is enabled.
// In SiLabs world, this probably means run it on the border router.
//
// Ex.: node cli/discover.js

var coap = require('coap');
var zclip = require('../.')(coap);

// Find On Off servers
var query = {
  cluster: zclip.OnOffCluster,
  side: zclip.SERVER
}

zclip.discover(query, function(err, device) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(device.meta.name, 'device found!');
  console.log('Ip:', device.ip);
  console.log('Endpoint:', device.endpoint);
});

