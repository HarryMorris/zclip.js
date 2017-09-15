module.exports = function() {
  return function(attrs) {
    attrs = attrs || {};

    this.ip = attrs.ip;
    this.port = attrs.port;
    this.endpoint = attrs.endpoint;
    this.meta = this.meta || {};

    this.basePath = '/zcl/e/' + this.endpoint + '/s' + parseInt(this.meta.code) + '/';
  }
}


