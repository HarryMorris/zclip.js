var util = require(__appRoot + 'lib/util')();

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var clusterName = util.pascalCase(zclCommand.keywords[1]);
    var ip = zclCommand.keywords[2];

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      printUsage(cli);
      printAvailableOptions(cli, clusterNames());
      cli.exit(1);
      return;
    }

    var query = clusterQuery(Cluster, zclCommand.options);

    cli.print('Devices');
    cli.print('------------------------------------');
    zclip.discover(query, function(err, ip) {
      if (err) {
        cli.printError(err);
        return;
      }

      cli.print(ip);
    });

  }

  function clusterQuery(Cluster, options) {
    return {
      cluster: Cluster,
      side: options.client ? zclip.CLIENT : zclip.SERVER
    }
  }

  function clusterNames() {
    var clusterNames = [];
    for (var clusterName in zclip.clusters) clusterNames.push(clusterName);
    return clusterNames.sort();
  }

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl discover <cluster>\n';
    cli.print(usage);
  }

  function printAvailableOptions(cli, options) {
    cli.print('Available clusters:');
    options.forEach(function(option) {
      cli.print(cli.TAB + util.camelCase(option));
    });
  }
}

