var cbor = require('cbor');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function(coap) {
  function OTAUpgradeCluster(attrs) {
    this.ip = attrs.ip;
    this.port = attrs.port;
    this.endpoint = attrs.endpoint;
  }

  util.inherits(OTAUpgradeCluster, EventEmitter);

  OTAUpgradeCluster.prototype.listen = function(coapServer) {
    var that = this;

    coapServer.on('request', function(req, res) {
      if (req.url.match(/zcl\/e\/1\/s19/)) {
        var payload = parseQueryNextImageRequest(req.payload);
        try {
          that.emit('queryNextImageRequest', payload, new BasicResponse(res));
        } catch(e) {
          console.log('err', e);
        }
      } else if (req.url.match(/ota/)) {
        that.emit('imageBlockRequest', {}, new BasicResponse(res));
      }
    });
  };

  function parseQueryNextImageRequest(payload) {
    var map = cbor.decodeFirstSync(payload);
    return {
      status: map.get(0),
      manufacturerCode: map.get(1),
      imageType: map.get(2),
      fileVersion: map.get(3),
      imageSize: map.get(4)
    }
  };

  function QueryNextImageResponse(res) {
    this.send = function(data) {
      var map = new Map();
      map.set(0, data.status);
      map.set(1, data.manufacturerCode);
      map.set(2, data.imageType);
      map.set(3, data.fileVersion);
      map.set(4, data.imageSize);

      var encodedPayload = cbor.encode(map);
      res.end(encodedPayload);
    }
  }

  function BasicResponse(res) {
    this.send = function(data) {
      res.end(data);
    }
  }


  return OTAUpgradeCluster;
}

