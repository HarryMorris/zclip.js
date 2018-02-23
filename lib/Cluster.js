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

Cluster.prototype.post = function(uri, payload) {
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

ClusterConstructor.class = Cluster;

