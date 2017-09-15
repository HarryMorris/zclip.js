var cbor = require('cbor');

module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = metaData || {};
    this.coap = coap;

    if (!this.meta.commands) {
      return;
    }

    var clusterBase = this;

    Object.getOwnPropertyNames(this.meta.commands).forEach(function(commandId) {
      var commandData = clusterBase.meta.commands[commandId];

      clusterBase[camelcase(commandData.name)] = function(args) {
        var request = coap.request({
          hostname: this.ip,
          port: this.port || 5683,
          method: 'POST',
          pathname: this.basePath + 'c/' + commandId
        });

        if (args) {
          var payload = new Map();

          Object.getOwnPropertyNames(args).forEach(function(argName) {
            var val = args[argName];
            var argIndex = commandData.args.indexOf(argName);

            if (argIndex >= 0) {
              payload.set(argIndex, val);
            }

          });

          var encodedPayload = cbor.encode(payload);
          request.write(encodedPayload);
        }

        request.end();
      }
    });
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }

  return ClusterBase;
};

