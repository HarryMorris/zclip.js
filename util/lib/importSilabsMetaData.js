var parseString = require('xml2js').parseString;
var  util = require(__dirname + '/../../lib/util')();

module.exports = importSilabsMetaData;

function importSilabsMetaData(rawData, target, callback) {
  parseString(rawData, function (err, xmlData) {
    xmlData.configurator.cluster.forEach(function(clusterNode) {
      var cluster = {};

      importRootClusterData(clusterNode, cluster);
      importCommands(clusterNode.command, cluster);
      importAttributes(clusterNode.attribute, cluster);

      var clusterIdMatch = /0x[0]*([a-fA-F0-9]+)/.exec(cluster.code);
      var clusterId = clusterIdMatch[1];
      target[clusterId] = cluster;
    });

    callback();
  });
}

function importRootClusterData(clusterNode, cluster) {
  cluster.name = formatClusterName(clusterNode.name[0]);
  cluster.code = clusterNode.code[0];

  var clusterIdMatch = /0x[0]*([a-fA-F0-9]+)/.exec(cluster.code);
  var clusterId = clusterIdMatch[1];
  cluster.clusterId = clusterId;
}

function formatClusterName(name) {
  return util.camelCase(stripSymbols(name));
}

function titalize(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function stripSymbols(str) {
  return str.replace(/[^a-zA-Z0-9 $]/g, ' ');
}

function importCommands(commandNodes, cluster) {
  cluster.commands = {};

  if (!commandNodes) {
    return;
  }

  commandNodes.forEach(function(commandNode) {
    var commandIdMatch = /0x[0]*(\d+)/.exec(commandNode.$.code);

    if (!commandIdMatch || !commandIdMatch[1]) {
      return;
    }

    var commandId = commandIdMatch[1];
    cluster.commands[commandId] = {
      name: util.camelCase(commandNode.$.name),
      args: {}
    }

    if (commandNode.arg) {
      commandNode.arg.forEach(function(argNode) {

        var argId = commandNode.arg.indexOf(argNode);
        cluster.commands[commandId].args[argId] = {
          name: util.camelCase(argNode.$.name),
          datatype: argNode.$.type.toLowerCase()
        }
      });
    }
  });
}

function importAttributes(attributeNodes, cluster) {
  cluster.attributes = {};

  if (!attributeNodes) {
    return;
  }

  attributeNodes.forEach(function(attributeNode) {
    cluster.attributes[parseInt(attributeNode.$.code)] = {
      name: util.camelCase(attributeNode._),
      side: attributeNode.$.side,
      datatype: attributeNode.$.type.toLowerCase(),
      min: attributeNode.$.min,
      max: attributeNode.$.max
    };
  });
}

