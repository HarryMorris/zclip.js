var cbor = require('cbor');
var _ = require('lodash');

module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = metaData || {};
    this.meta.commands = this.meta.commands || {};
    this.meta.attributes = this.meta.attributes || {};
    this.coap = coap;

    this.read = function(options, callback) {
      var request = this.get(this.basePath + 'a', 'f=*');

      request.on('response', _.bind(function(response) {
        callback(null, {
          responseCode: response.code,
          response: this._parsePayload(response.payload)
        });
      }, this));

      request.end();
    };

    this._defineCommand = _.bind(function(commandId) {
      var commandData = this.meta.commands[commandId];

      this[camelcase(commandData.name)] = function(args, callback) {
        var request = this.post(this.basePath + 'c/' + commandId);
        var payload = this._buildCommandPayload(args, commandData);
        this.writePayload(request, payload);

        request.on('response', function(response) {
          var payload = '';

          if (response.payload) {
            payload = cbor.decodeFirstSync(response.payload);
          }

          callback(null, {
            responseCode: response.code,
            response: payload
          });
        });

        request.end();
      }
    }, this);

    this.get = function(path, query) {
      return coap.request({
        hostname: this.ip,
        port: this.port,
        method: 'GET',
        pathname: path,
        query: query
      });
    };

    this.post = function(path) {
      return coap.request({
        hostname: this.ip,
        port: this.port,
        method: 'POST',
        pathname: path
      });
    };

    this._buildCommandPayload = _.bind(function(data, commandData) {
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

    this._parsePayload = _.bind(function(payload) {
      var encodedPayload = cbor.decodeFirstSync(payload);
      var decodedPayload = {};

      encodedPayload.forEach(_.bind(function(val, key) {
        var attribute = this.meta.attributes[key.toString()];
        if (attribute) decodedPayload[attribute.name] = val.v;
      }, this));

      return decodedPayload;
    }, this);

    Object.getOwnPropertyNames(this.meta.commands).forEach(this._defineCommand);
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }

  return ClusterBase;
};

