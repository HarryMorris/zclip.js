var parseString = require('xml2js').parseString;

module.exports = importSilabsMetaData;

function importSilabsMetaData(rawData, target, callback) {
  parseString(rawData, function (err, xmlData) {
    xmlData.configurator.cluster.forEach(function(clusterNode) {
      var cluster = {};

      importRootClusterData(clusterNode, cluster);
      importCommands(clusterNode.command, cluster);
      importAttributes(clusterNode.attribute, cluster);

      target[parseInt(cluster.code)] = cluster;
    });

    callback();
  });
}

function importRootClusterData(clusterNode, cluster) {
  cluster.code = clusterNode.code[0];
  cluster.name = formatClusterName(clusterNode.name[0]);
}

function formatClusterName(name) {
  return titalize(stripSymbols(name));
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
    var commandId = parseInt(commandNode.$.code);
    cluster.commands[commandId] = {
      name: commandNode.$.name,
      args: []
    }

    if (commandNode.arg) {
      commandNode.arg.forEach(function(argNode) {
        cluster.commands[commandId].args.push(argNode.$.name);
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
      name: attributeNode._,
      side: attributeNode.$.side,
      type: attributeNode.$.type,
      min: attributeNode.$.min,
      max: attributeNode.$.max
    };
  });
}

