var _ = require('lodash');

global.ZCL_USAGE = 'Usage:\n  zcl <command> [<args>] [options]\n';

module.exports = function(handlers) {
  return function(zclCommand, cli) {
    var handler = handlers[zclCommand.keywords[0]];

    if (zclCommand.options.version) {
      printVersion(cli);
      return;
    }

    if (!handler) {
      printUsage(cli);
      return;
    }

    handler(zclCommand, cli);
  }

  function printUsage(cli) {
    cli.print(ZCL_USAGE);

    cli.print('Available commands:');
    _.keys(handlers).forEach(function(command) {
      cli.print(cli.TAB + command);
    });
  }

  function printVersion(cli) {
    var version = require(__appRoot + 'package.json').version;
    cli.print('Version: ' + version);
  }
}

