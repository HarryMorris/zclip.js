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
	console.log('size=', getFilesizeInBytes("1234-5678-80000000.ota"));

  response.send({
    status: 0x0000,
    manufacturerCode: request.manufacturerCode,
    imageType: request.imageType,
    fileVersion: request.fileVersion + 1,
    imageSize: getFilesizeInBytes("1234-5678-80000000.ota")
  });
});

const fs = require("fs");
function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

otaCluster.listen(coapServer);

