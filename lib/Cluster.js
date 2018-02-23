var base64url = require('base64url');

module.exports = ClusterConstructor;

function ClusterConstructor(attrs, coap) {
  return new Cluster(attrs, coap);
}

function Cluster(attrs, coap) {
  this.coap = coap;

  attrs = attrs || {};
  this.clusterId = attrs.clusterId;
  this.ip = attrs.ip;
  this.port = attrs.port || 5683;
  this.endpoint = attrs.endpoint || 1;
  this.side = attrs.side || 's';
  this.rdIp = attrs.rdIp;
  this.rdPort = attrs.rdPort;

  this.basePath = `/zcl/e/${this.endpoint}/${this.side}${this.clusterId}/`;
}

Cluster.prototype.bind = function(args, callback) {
  var destinationAddress;

  if (args.uid) {
    destinationAddress = 'sha-256;' + base64url.encode(args.uid, 'hex');
  } else {
    destinationAddress = `[${args.ip}]`;
  }

  var destinationUri = `coap://${destinationAddress}:${args.port}/zcl/e/${args.endpoint}`
  var payload = cbor.encode({ u: destinationUri });

  var request = this.post('b', payload);

  request.on('response', (response) => {
    if (response.payload.length)
      payload = cbor.decodeFirstSync(response.payload);

    callback(null, payload, response.code);
  });

  request.on('error', callback);

  request.end();
}

Cluster.prototype.getBindings = function(callback) {
  var request = this.get('b');

  request.on('response', (response) => {
    var payload = '';

    if (response.payload.length)
      payload = cbor.decodeFirstSync(response.payload);

    callback(null, payload, response.code);
  });

  request.on('error', callback);

  request.end();
}

Cluster.prototype.deleteBinding = function(bindId, callback) {
  var request = this.delete('b/' + bindId);

  request.on('response', (response) => {
    var payload = '';

    if (response.payload.length)
      payload = cbor.decodeFirstSync(response.payload);

    callback(null, payload, response.code);
  });

  request.on('error', callback);

  request.end();
}

Cluster.prototype.get = function(uri, query) {
  return this.coap.request({
    hostname: this.ip,
    port: this.port,
    method: 'GET',
    pathname: this.basePath + uri,
    query: query
  });
};

Cluster.prototype.post = function(uri, payload) {
  // this.fetchIp(function(err, ip) {
  var request = this.coap.request({
    hostname: this.ip,
    port: this.port,
    method: 'POST',
    pathname: this.basePath + uri
  });

  if (payload)
    request.write(payload);

  return request;
}

Cluster.prototype.delete = function(uri) {
  return this.coap.request({
    hostname: this.ip,
    port: this.port,
    method: 'DELETE',
    pathname: this.basePath + uri
  });
};

ClusterConstructor.class = Cluster;

