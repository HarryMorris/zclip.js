var _ = require('lodash');

global.ZCL_USAGE = 'Usage:\n  zcl <command> [<args>] [options]\n';

module.exports = function(handlers) {
  return function(zclCommand, cli) {
    var handler = handlers[zclCommand.keywords[0]];

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
}

