var coap = require('coap');
var coapServer = coap.createServer();

coapServer.listen(function() {
  console.log('Coap server listening on 5683');
});

var zcl = require('../zcl')(coap);

var otaCluster = new zcl.OTAUpgradeCluster({
  ip: '127.0.0.1',
  endpoint: 1
});

otaCluster.on('queryNextImage', function(request, response) {
  console.log('queryNextImage request');

  console.log('Status: ', request.status);
  console.log('Manufacturer Code: ', request.manufacturerCode);
  console.log('Image Type: ', request.imageType);
  console.log('File Version: ', request.fileVersion);
  console.log('Image Size: ', request.imageSize);

  response.send({
    status: 0x0002,
    manufacturerCode: 0x0002,
    imageType: 0x0002,
    fileVersion: 0x0002,
    imageSize: 0x0002
  });
});

otaCluster.listen(coapServer);

