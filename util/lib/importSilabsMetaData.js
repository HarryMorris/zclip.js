var parseString = require('xml2js').parseString;

module.exports = importSilabsMetaData;

function importSilabsMetaData(rawData, target, callback) {
  parseString(rawData, function (err, xmlData) {
    xmlData.configurator.cluster.forEach(function(clusterNode) {
      var cluster = {};

      importRootClusterData(clusterNode, cluster);
      importCommands(clusterNode.command, cluster);
      importAttributes(clusterNode.attribute, cluster);

      target[cluster.code] = cluster;
    });

    callback();
  });
}

function importRootClusterData(clusterNode, cluster) {
  cluster.code = clusterNode.code;
  cluster.name = clusterNode.name[0];
}

function importCommands(commandNodes, cluster) {
  cluster.commands = {};

  if (!commandNodes) {
    return;
  }

  commandNodes.forEach(function(commandNode) {
    cluster.commands[commandNode.$.code] = {
      name: commandNode.$.name
    }
  });
}

function importAttributes(attributeNodes, cluster) {
  cluster.attributes = {};

  if (!attributeNodes) {
    return;
  }

  attributeNodes.forEach(function(attributeNode) {
    cluster.attributes[attributeNode.$.code] = {
      name: attributeNode._,
      side: attributeNode.$.side,
      type: attributeNode.$.type,
      min: attributeNode.$.min,
      max: attributeNode.$.max
    };
  });
}

