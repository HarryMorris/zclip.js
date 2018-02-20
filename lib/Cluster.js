module.exports = function() {
  return function(attrs) {
    attrs = attrs || {};

    this.ip = attrs.ip;
    this.port = attrs.port || 5683;
    this.endpoint = attrs.endpoint || 1;
    this.meta = this.meta || {};
    this.side = attrs.side || 's';

    this.rdIp = attrs.rdIp;
    this.rdPort = attrs.rdPort;

    this.basePath = '/zcl/e/' + this.endpoint + '/' + this.side + parseInt(this.meta.clusterId) + '/';
    this.baseClientPath = '/zcl/e/' + this.endpoint + '/c' + parseInt(this.meta.clusterId) + '/';
  }
}


