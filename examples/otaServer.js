var coap = require('coap');
var fs = require('fs');
var zcl = require('../zcl')(coap);

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

  var fileVersion = 0;
  var fileSize = 0;
  fs.readdirSync('.').forEach(file => {
      var matchArr;
      if(matchArr = file.match(/(\d\d\d\d)-(\d\d\d\d)-(\d\d\d\d\d\d\d\d)\.ota$/)) {
        if((parseInt(matchArr[1],16) == request.manufacturerCode) && (parseInt(matchArr[2],16) == request.imageType)) {
          if(parseInt(matchArr[3],16) >= fileVersion) {
            fileVersion = parseInt(matchArr[3],16);
            fileSize = fs.statSync(file).size;
          }
        }
      }
  });

  console.log('File Version: ', fileVersion);
	console.log('Image Size=', fileSize);

  response.send({
    status: 0x0000,
    manufacturerCode: request.manufacturerCode,
    imageType: request.imageType,
    fileVersion: fileVersion,
    imageSize: fileSize
  });
});

otaCluster.on('imageBlockRequest', function(request, response) {
  console.log('ota request');

  response.send(fs.readFileSync('1234-5678-80000000.ota'));
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

