var cbor = require('cbor');
var util = require('util');
var pascalCase = require(__appRoot + 'lib/util/pascalCase');
var camelCase = require(__appRoot + 'lib/util/camelCase');
var base64url = require('base64url');

module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = this._initMetaData(metaData);
    this.coap = coap;
    this.commands = {};

    var commandIds = this._getCommandIdsFromMeta(this.meta);

    commandIds.forEach(function(commandId) {
      this._defineCommand(commandId);
    }, this);
  }

  ClusterBase.prototype._initMetaData = function(metaData) {
    var meta = metaData || {};
    meta.commands = meta.commands || {};
    meta.attributes = meta.attributes || {};

    return meta;
  }

  ClusterBase.prototype._getCommandIdsFromMeta = function(meta) {
    return Object.getOwnPropertyNames(meta.commands);
  };

  ClusterBase.prototype.read = function(options, callback) {
    var attributePath = this.basePath + 'a';
    var allAttributesQuery = 'f=*';

    var request = this.get(attributePath, allAttributesQuery);

    var that = this;
    request.on('response', function(response) {
      callback(null, {
        responseCode: response.code,
        response: that._parseAttributePayload(response.payload)
      });
    });

    request.on('error', callback);

    request.end();
  };

  ClusterBase.prototype.bind = function(args, callback) {
    var request = this.post(this.basePath + 'b');

    request.on('response', (response) => {
      var payload = '';

      if (response.payload.length)
        payload = cbor.decodeFirstSync(response.payload);

      callback(null, {
        responseCode: response.code,
        response: payload
      });
    });

    request.on('error', (e) => {
      console.log(e);
      callback(e);
    });


    var destinationAddress;

    if (args.uid) {
      destinationAddress = 'sha-256;' + base64url.encode(args.uid, 'hex');
    } else {
      destinationAddress = `[${args.ip}]`;
    }
    var destinationUri = `coap://${destinationAddress}:${args.port}/zcl/e/${args.endpoint}`
    var payload = { u: destinationUri };
    var encodedPayload = cbor.encode(payload);
    request.write(encodedPayload);

    request.end();
  }

  ClusterBase.prototype.deleteBinding = function(bindId, callback) {
    var request = this.delete(this.basePath + 'b/' + bindId);

    request.on('response', (response) => {
      var payload = '';

      if (response.payload.length)
        payload = cbor.decodeFirstSync(response.payload);

      callback(null, {
        responseCode: response.code,
        response: payload
      });
    });

    request.on('error', (e) => {
      callback(e);
    });

    request.end();
  }

  ClusterBase.prototype.getBindings = function(callback) {
    var request = this.get(this.basePath + 'b');

    request.on('response', (response) => {
      var payload = '';

      if (response.payload.length)
        payload = cbor.decodeFirstSync(response.payload);

      callback(null, {
        responseCode: response.code,
        response: payload
      });
    });

    request.on('error', (e) => {
      callback(e);
    });

    request.end();
  }

  ClusterBase.prototype.listen = function(coapServer) {
    var cluster = this;

    coapServer.on('request', function(req, res) {
      var notificationRegExp = new RegExp(cluster.baseClientPath + 'n')
      var notificationMatch = notificationRegExp.exec(req.url);

      if (notificationMatch) {
        if (!cluster.notificationHandler) return;

        var payload = cbor.decodeFirstSync(req.payload);
        var parsedPayload = cluster._parseReportPayload(payload.a);
        cluster.notificationHandler({ payload: parsedPayload }, new RequestResponse(res));

        return;
      }

      var commandRegExp = new RegExp(cluster.basePath + "c/(\\d+)")
      var commandMatch = commandRegExp.exec(req.url);

      if (!commandMatch) return;

      var commandId = commandMatch[1];
      var command = cluster.meta.commands[commandId];

      if (!command) return;

      var handler = cluster[command.name + 'Handler'];

      if (handler) {
        var payload = cluster._parseCommandPayload(commandId, req.payload);
        handler({ payload: payload }, new RequestResponse(res));
      }
    });

    function RequestResponse(res) {
      this.send = function(params) {
        params = params || {};

        if (params.statusCode)
          res.statusCode = params.statusCode;

        res.end(params.payload);
      }
    }
  }

  ClusterBase.prototype.commandArgs = function(commandName) {
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

  ClusterBase.prototype.delete = function(path, query) {
    return this.coap.request({
      hostname: this.ip,
      port: this.port,
      method: 'DELETE',
      pathname: path,
      query: query
    });
  };

  ClusterBase.prototype.get = function(path, query) {
    return this.coap.request({
      hostname: this.ip,
      port: this.port,
      method: 'GET',
      pathname: path,
      query: query
    });
  };

  ClusterBase.prototype.post = function(path) {
    return this.coap.request({
      hostname: this.ip,
      port: this.port,
      method: 'POST',
      pathname: path
    });
  };

  ClusterBase.prototype._defineCommand = function(commandId) {
    var commandData = this.meta.commands[commandId];
    var commandName = camelCase(commandData.name);

    this.commands[pascalCase(commandName)] = function(args) {
      this.args = args;
      this.payload = encodePayload(args);

      function encodePayload(args) {
        if (!args) return;

        var payload = new Map();

        Object.getOwnPropertyNames(args).forEach(function(argName) {
          var argId = Object.keys(commandData.args).find(function(argId) {
            return commandData.args[argId].name == argName;
          });

          var val = args[argName];

          if (argId) {
            payload.set(parseInt(argId), val);
          }
        });

        return cbor.encode(payload);
      }
    }

    this[commandName] = function(args, callback) {
      callback = callback || function() {};

      // Find missing args

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

      // Request

      var request = this.post(this.basePath + 'c/' + commandId);
      var payload = this._encodePayload(args, commandData);

      if (payload)
        request.write(payload);

      request.on('response', function(response) {
        var payload = '';

        if (response.payload.length)
          payload = cbor.decodeFirstSync(response.payload);

        callback(null, {
          responseCode: response.code,
          response: payload
        });
      });

      request.on('error', callback);

      request.end();
    }
  };

  ClusterBase.prototype._parseReportPayload = function(payload) {
    var clusterAttributes = this.meta.attributes;
    var decodedPayload = {};

    payload.forEach(function(val, key) {
      var attribute = clusterAttributes[key.toString()];
      if (attribute) decodedPayload[attribute.name] = val;
    });

    return decodedPayload;
  };

  ClusterBase.prototype._parseAttributePayload = function(payload) {
    if (!payload.length) return '';

    var clusterAttributes = this.meta.attributes;
    var decodedPayload = cbor.decodeFirstSync(payload);
    var resultPayload = {};

    decodedPayload.forEach(function(val, key) {
      var attribute = clusterAttributes[key.toString()];
      if (attribute) resultPayload[attribute.name] = val.v;
    });

    return resultPayload;
  };

  ClusterBase.prototype._encodePayload = function(data, commandData) {
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

    return cbor.encode(payload);
  };

  ClusterBase.prototype._parseCommandPayload = function(commandId, payload) {
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

  return ClusterBase;
};

