// Ex.: node cli/blinky.js <deviceIp>

var coap = require('coap');
var zcl = require('../.')(coap);

function blink(deviceIp) {
  var onOffCluster = new zcl.OnOffCluster({
    ip: deviceIp,
    endpoint: 1
  });

  setInterval(function() {
    onOffCluster.toggle();
  }, 500);
}

// Setup cli command
var cli = require('commander')
            .name('node cli/blinky.js')
            .usage('<deviceIp>')
            .arguments('<deviceIp>')
            .action(blink)
            .parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp();
  return;
}
