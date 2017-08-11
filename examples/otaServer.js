var coap = require('coap');
var fs = require('fs');
var zcl = require('../zcl')(coap);

var IMAGE_PATH = './1234-5678-80000000.ota';
var coapServer = coap.createServer();

coapServer.listen(function() {
  console.log('Coap server listening on 5683');
});

var otaCluster = new zcl.OTAUpgradeCluster({
  ip: '127.0.0.1',
  endpoint: 1
});

otaCluster.on('queryNextImageRequest', function(request, response) {
  console.log('queryNextImage request');

  console.log('Status: ', request.status);
  console.log('Manufacturer Code: ', request.manufacturerCode);
  console.log('Image Type: ', request.imageType);
  console.log('File Version: ', request.fileVersion);
  console.log('Image Size: ', request.imageSize);
	console.log('size=', getFilesizeInBytes(IMAGE_PATH));

  response.send({
    status: 0x0000,
    manufacturerCode: request.manufacturerCode,
    imageType: request.imageType,
    fileVersion: request.fileVersion + 1,
    imageSize: getFilesizeInBytes(IMAGE_PATH)
  });
});

otaCluster.on('imageBlockRequest', function(request, response) {
  console.log('ota request');

  response.send(fs.readFileSync(IMAGE_PATH));
});

otaCluster.on('upgradeEndRequest', function(request, response) {
  console.log('upgradeEndRequest request');

  console.log('Status: ', request.status);
  console.log('Manufacturer Code: ', request.manufacturerCode);
  console.log('Image Type: ', request.imageType);
  console.log('File Version: ', request.fileVersion);

  response.send({
    manufacturerCode: request.manufacturerCode,
    imageType: request.imageType,
    fileVersion: request.fileVersion,
    currentTime: 0,
    upgradeTime: 0
  });
});

otaCluster.listen(coapServer);

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename)
  return stats.size;
}

