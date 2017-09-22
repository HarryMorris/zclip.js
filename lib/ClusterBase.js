var cbor = require('cbor');
var _ = require('lodash');

module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = metaData || {};
    this.coap = coap;

    if (!this.meta.commands) {
      return;
    }

    this.defineCommand = _.bind(function(commandId) {
      var commandData = this.meta.commands[commandId];


      this[camelcase(commandData.name)] = function(args) {
        var request = coap.request({
          hostname: this.ip,
          port: this.port || 5683,
          method: 'POST',
          pathname: this.basePath + 'c/' + commandId
        });

        var payload = this.buildCommandPayload(args, commandData);
        this.writePayload(request, payload);

        request.end();
      }
    }, this);

    this.buildCommandPayload = _.bind(function(data, commandData) {
      if (!data) return;

      var payload = new Map();

      Object.getOwnPropertyNames(data).forEach(function(argName) {
        var val = data[argName];
        var argIndex = commandData.args.indexOf(argName);

        if (argIndex >= 0) {
          payload.set(argIndex, val);
        }
      });

      return payload;
    });

    this.writePayload = _.bind(function(request, payload) {
      if (!payload) return;

      var encodedPayload = cbor.encode(payload);
      request.write(encodedPayload);
    }, this);

    Object.getOwnPropertyNames(this.meta.commands).forEach(this.defineCommand);
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }

  return ClusterBase;
};

