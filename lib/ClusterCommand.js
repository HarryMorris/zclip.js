var cbor = require('cbor');
var noOp = require(__appRoot + 'lib/noOp');
var MissingArgumentsError = require(__appRoot + 'lib/errors/MissingArgumentsError');

module.exports = function(commandId, commandMeta, cluster) {
  return new ClusterCommand(commandId, commandMeta, cluster);
}

function ClusterCommand(commandId, commandMeta, cluster) {
  this.commandId = commandId;
  this.commandMeta = commandMeta;
  this.cluster = cluster;
}

ClusterCommand.prototype.call = function(args, callback) {
  callback = callback || noOp;

  var missingArgs = this._missingArgs(args);

  if (missingArgs.length) {
    callback(new MissingArgumentsError(missingArgs));
    return;
  }

  var payload = this.encodePayload(args);
  this.cluster.post('c/' + this.commandId, payload, callback);
}

ClusterCommand.prototype._missingArgs = function(args) {
  var argsMetaData = this.commandMeta.args || {};
  var requiredArgsByName = [];

  Object.keys(argsMetaData).forEach((argId) => {
    requiredArgsByName.push(argsMetaData[argId].name);
  });

  var providedArgNames = Object.keys(args || {});
  var missingArgNames = [];

  requiredArgsByName.forEach(function(argName) {
    if (providedArgNames.indexOf(argName) == -1) {
      missingArgNames.push(argName);
    }
  });

  return missingArgNames;
}

ClusterCommand.prototype.encodePayload = function(payload) {
  var argsMetaData = this.commandMeta.args;

  if (!payload || !argsMetaData) return;

  var encodedPayload = new Map();

  Object.getOwnPropertyNames(payload).forEach(function(argName) {
    var argId = Object.keys(argsMetaData).find(function(argId) {
      return argsMetaData[argId].name == argName;
    }, this);

    var val = payload[argName];

    if (argId) {
      encodedPayload.set(parseInt(argId), val);
    }
  }, this);

  return cbor.encode(encodedPayload);
};

ClusterCommand.prototype.decodePayload = function(payload) {
  if (!payload) return;

  return cbor.decodeFirstSync(payload);
}

