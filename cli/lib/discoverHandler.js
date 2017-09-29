var _ = require('lodash');
_.mixin({ 'pascalCase': _.flow(_.camelCase, _.upperFirst) });

module.exports = function(zclip) {
  return function(zclCommand, cli) {
    var clusterName = _.pascalCase(zclCommand.keywords[1]);
    var ip = zclCommand.keywords[2];

    var Cluster = zclip.clusters[clusterName];

    if (!Cluster) {
      printErrorAndUsage(cli, 'Error: Cluster not found');
      printAvailableOptions(cli, _.keys(zclip.clusters).sort());
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

  function printErrorAndUsage(cli, error) {
    printUsage(cli);
    cli.printError(error + '\n');
  }

  function printUsage(cli) {
    var usage = 'Usage:\n  zcl discover <clusterName>\n';
    var example = 'Example:\n  zcl discover levelControl\n';
    cli.print(usage);
    cli.print(example);
  }

  function printAvailableOptions(cli, options) {
    cli.print('Available Options:');
    options.forEach(function(option) {
      cli.print(cli.TAB + camelcase(option));
    });
  }

  function camelcase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toLowerCase() + txt.substr(1);});
  }
}

