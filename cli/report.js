// Have a device report attribute updates.
//
// Ex.: `node cli/report.js <sourceIp> <destinationIp>`

var coap = require('coap');
var zclip = require('../.')(coap);

function report(sourceIp, destinationIp, options) {

  // Create coap server
  var server = coap.createServer({ type: 'udp6' });
  var destinationPort = options.destinationPort || 5683;

  server.listen(destinationPort, function() {
    console.log('Coap server listening on', destinationPort);
  });

  // Tell On Off cluster to report
  var onOffCluster = new zclip.OnOffCluster({
    ip: sourceIp,
    endpoint: options.sourceEndpoint || 1
  });

  onOffCluster.report({
    destinationIp: destinationIp,
    destinationPort: destinationPort,
    endpoint: options.destinationEndpoint || 1,
    reportId: options.reportId
  }, function(err) {
    if (err) {
      console.log('Could not bind.', err);
    } else {
      console.log('Successfully bound.');
    }
  });

  // Listen for reports
  onOffCluster.listen(server, function(report) {
    console.log('Report received:', report);
  });
}

// Setup cli command
require('commander')
  .name('node examples/bind.js')
  .usage('<sourceIp> <destinationIp>')
  .arguments('<sourceIp> <destinationIp>')
  .option('--sourceEndpoint <endpoint>', 'Specify a source endpoint. Defaults to 1.')
  .option('--destinationEndpoint <endpoint>', 'Specify a destination endpoint. Defaults to 1.')
  .option('--destinationPort <destinationPort>', 'Specify a destination port. Defaults to 5683.')
  .option('--reportId <id>', 'Specify a report id. Defaults to null.')
  .action(report)
  .parse(process.argv);
