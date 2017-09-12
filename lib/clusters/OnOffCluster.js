var cbor = require('cbor');

module.exports = function(target, coap) {
  if (!target.OnOffCluster) {
    console.log('Expected OnOffCluster on', target);
  }

  target.OnOffCluster.prototype.toggle = function() {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: this.basePath + 's6/c/2'
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }

  target.OnOffCluster.prototype.report = function(attrs, callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: this.basePath + 's6/b'
    });

    request.on('response', (response) => {
      if (response.code == '2.01') {
        callback();
      } else {
        callback('Expected 2.01 response. Got', response.code);
      }
    });

    request.on('error', (e) => {
      callback(e);
    });

    var destinationUri = `coap://[${attrs.destinationIp}]:${attrs.destinationPort}/zcl/e/${attrs.endpoint}`
    var payload = { u: destinationUri };
    var encodedPayload = cbor.encode(payload);
    request.write(encodedPayload);

    request.end();
  }

  target.OnOffCluster.prototype.listen = function(server, callback) {
    var meta = this.meta;

    server.on('request', function(req, res) {
      if (req.payload) {
        var payload = cbor.decodeFirstSync(req.payload);
        var encodedReport = payload['a'];
        var report = {};

        encodedReport.forEach(function(val, key) {
          report[meta.attributes[key.toString()].name] = val;
        });

        callback(report);
      }
    });
  }
}
