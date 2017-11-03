var cbor = require('cbor');
var util = require('util');
var pascalCase = require(__appRoot + 'lib/util/pascalCase');
var camelCase = require(__appRoot + 'lib/util/camelCase');

module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = metaData || {};
    this.meta.commands = this.meta.commands || {};
    this.meta.attributes = this.meta.attributes || {};
    this.coap = coap;

    this.commandArgs = function(commandName) {
      var commandData;

      for (var commandId in this.meta.commands) {
        if(this.meta.commands[commandId].name == commandName) {
          commandData = this.meta.commands[commandId]
        }
      }

      if (!commandData) return [];

      var args = []

      for (var argId in commandData.args) {
        args.push(commandData.args[argId]);
      }

      return args;
    };

    this.listen = function(coapServer) {
      var cluster = this;

      coapServer.on('request', function(req, res) {
        var commandRegExp = new RegExp(cluster.basePath + "c/(\\d+)")
        var commandMatch = commandRegExp.exec(req.url);

        if (!commandMatch) return;

        var commandId = commandMatch[1];
        var command = cluster.meta.commands[commandId];

        if (!command) return;

        var handler = cluster[command.name + 'Handler'];

        if (handler) {
          var payload = cluster._parseCommandPayload(commandId, req.payload);
          handler({ payload: payload }, new Response(res));
        }
      });

      function Response(res) {
        this.send = function(params) {
          params = params || {};

          if (params.statusCode)
            res.statusCode = params.statusCode;

          res.end(params.payload);
        }
      }
    }

    this._defineCommand = function(commandId) {
      var commandData = this.meta.commands[commandId];
      var commandName = camelCase(commandData.name);

      this[commandName] = function(args, callback) {
        callback = callback || function() {};


        var requiredArgNames = this.commandArgs(commandName).map(function(arg) {
          return arg.name;
        });

        var providedArgNames = Object.keys(args || {});
        var missingArgNames = [];

        requiredArgNames.forEach(function(argName) {
          if (providedArgNames.indexOf(argName) == -1) missingArgNames.push(argName);
        });

        if (missingArgNames.length) {
          callback('Missing arguments ' + missingArgNames.join(', ') + '.');
          return;
        }

        var request = this.post(this.basePath + 'c/' + commandId);
        var payload = this._buildCommandPayload(args, commandData);

        this.writePayload(request, payload);

        request.on('response', function(response) {
          var payload = '';

          if (response.payload.length) {
            payload = cbor.decodeFirstSync(response.payload);
          }

          callback(null, {
            responseCode: response.code,
            response: payload
          });
        });

        request.on('error', function(err) {
          callback(err);
        });

        request.end();
      }
    };

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

    this._buildCommandPayload = function(data, commandData) {
      if (!data) return;

      var payload = new Map();

      Object.getOwnPropertyNames(data).forEach(function(argName) {
        var argId = Object.keys(commandData.args).find(function(argId) {
          return commandData.args[argId].name == argName;
        });

        var val = data[argName];

        if (argId) {
          payload.set(parseInt(argId), val);
        }
      });

      return payload;
    };

    this.writePayload = function(request, payload) {
      if (!payload) return;

      var encodedPayload = cbor.encode(payload);
      request.write(encodedPayload);
    };

    this._parseCommandPayload = function(commandId, payload) {
      if (!payload || !payload.length) {
        return '';
      }

      var cluster = this;
      var encodedPayload = cbor.decodeFirstSync(payload);
      var decodedPayload = {};

      encodedPayload.forEach(function(val, key) {
        var arg = cluster.meta.commands[commandId].args[key];
        if (arg) decodedPayload[arg.name] = val;
      });

      return decodedPayload;
    };

    this._parseAttributePayload = function(payload) {
      if (!payload.length) {
        return '';
      }

      var that = this;
      var encodedPayload = cbor.decodeFirstSync(payload);
      var decodedPayload = {};

      encodedPayload.forEach(function(val, key) {
        var attribute = that.meta.attributes[key.toString()];
        if (attribute) decodedPayload[attribute.name] = val.v;
      });

      return decodedPayload;
    };

    ClusterBase.prototype.read = function(options, callback) {
      var that = this;
      var request = this.get(this.basePath + 'a', 'f=*');

      request.on('response', function(response) {
        callback(null, {
          responseCode: response.code,
          response: that._parseAttributePayload(response.payload)
        });
      });

      request.on('error', function(err) {
        callback(err);
      });

      request.end();
    };


    var that = this;
    Object.getOwnPropertyNames(this.meta.commands).forEach(function(commandId) {
      that._defineCommand(commandId);
    });
  }

  return ClusterBase;
};

