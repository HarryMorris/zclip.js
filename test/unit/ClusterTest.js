require(__dirname + '/support/testHelper');

var Cluster;
var ip = '192.168.1.1';
var port = 5683;
var endpoint = 1;

beforeAll(function() {
  Cluster = require(__appRoot + 'lib/Cluster')();
});

test('Cluster assigns attributes', function() {
  var cluster = new Cluster({
    ip: ip,
    port: port,
    endpoint: endpoint
  });

  expect(cluster.ip).toEqual(ip);
  expect(cluster.port).toEqual(port);
  expect(cluster.endpoint).toEqual(endpoint);
});
