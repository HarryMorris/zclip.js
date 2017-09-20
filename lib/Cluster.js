module.exports = function() {
  return function(attrs) {
    attrs = attrs || {};

    this.ip = attrs.ip;
    this.port = attrs.port || 5683;
    this.endpoint = attrs.endpoint || 1;
    this.meta = this.meta || {};

    this.basePath = '/zcl/e/' + this.endpoint + '/s' + parseInt(this.meta.code) + '/';
  }
}


