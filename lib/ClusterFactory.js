var util = require(__appRoot + 'lib/util')();
var Cluster = require(__appRoot + 'lib/Cluster');
var ClusterCommand = require(__appRoot + 'lib/ClusterCommand');

module.exports = function(args) {
  var coap = args.coap;

  return function ClusterFactory(metaData) {
    var NewCluster = function(attrs, metaData) {
      Cluster.class.apply(this, arguments);
    }

    NewCluster.prototype = Object.create(Cluster.class.prototype);
    defineCommands(NewCluster, metaData.commands);

    return function(attrs) {
      attrs = Object.assign({}, attrs, { clusterId: metaData.clusterId });
      return new NewCluster(attrs, coap);
    }
  }

  function defineCommands(ClusterClass, commandsMetaData) {
    if (!commandsMetaData) return;

    Object.getOwnPropertyNames(commandsMetaData).forEach((commandId) => {
      var meta = commandsMetaData[commandId];
      var commandName = util.camelCase(meta.name);

      ClusterClass.prototype[commandName] = function(args, callback) {
        var command = ClusterCommand(commandId, meta, this);
        command.call(args, callback);
      }
    });
  }
}

