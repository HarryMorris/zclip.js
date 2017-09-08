// FYI, no effort has been put into drying this up. 
// I am only driving out the api.

var cbor = require('cbor');
var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function(coap) {
  function OnOffCluster(attrs) {
    this.ip = attrs.ip;
    this.port = attrs.port;
    this.endpoint = attrs.endpoint;
  }

  util.inherits(OnOffCluster, EventEmitter);

  OnOffCluster.prototype.listen = function(coapServer) {
    var that = this;

    coapServer.on('request', function(req, res) {
      if (req.url.match(/zcl\/e\/1\/s6\/c\/0/)) {
        try {
          that.emit('on', {}, res);
        } catch(e) {
          console.log('err', e);
        }
      } else if (req.url.match(/zcl\/e\/1\/s19\/c\/1/)) {
        try {
          that.emit('off', {}, res);
        } catch(e) {
          console.log('err', e);
        }
      }
    });
  };

  OnOffCluster.prototype.on = function(callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s6/c/1`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }

  OnOffCluster.prototype.off = function(callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s6/c/0`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }

  OnOffCluster.prototype.toggle = function(callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s6/c/2`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }

  OnOffCluster.prototype.bind = function(attrs, callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s6/b`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    var destinationUri = `coap://[${attrs.destinationIp}]/zcl/e/${attrs.endpoint}`
    var payload = { u: destinationUri };
    var encodedPayload = cbor.encode(payload);
    request.write(encodedPayload);

    request.end();
  }

  return OnOffCluster;
}

