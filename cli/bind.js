// This example is runnable.
//
// Ex.: `node examples/bind.js <sourceIp> <destinationIp>`
//
// Help:  `node examples/bind.js --help`

// Bind Example
var coap = require('coap');
var zcl = require('../.')(coap);

function bindExample(sourceIp, destinationIp, options) {

  var onOffCluster = new zcl.OnOffCluster({
    ip: sourceIp,
    endpoint: options.sourceEndpoint || 1
  });

  onOffCluster.bind({
    destinationIp: destinationIp,
    endpoint: options.destinationEndpoint || 1,
    reportId: options.reportId
  });

}

// Setup cli command
require('commander')
  .name('node examples/bind.js')
  .usage('<sourceIp> <destinationIp>')
  .arguments('<sourceIp> <destinationIp>')
  .option('--sourceEndpoint <endpoint>', 'Specify a source endpoint. Defaults to 1.')
  .option('--destinationEndpoint <endpoint>', 'Specify a destination endpoint. Defaults to 1.')
  .option('--reportId <id>', 'Specify a report id. Defaults to null.')
  .action(bindExample)
  .parse(process.argv);
