require(__dirname + '/support/testHelper');

var discover;
var fakeCoap;

function FakeCluster(attrs) {
  this.ip = attrs.ip;
  this.port = attrs.port;
  this.endpoint = attrs.endpoint;
}

FakeCluster.prototype.meta = {
  clusterId: '6'
}

beforeAll(function() {
  fakeCoap = new FakeCoap();
  discover = require(__appRoot + 'lib/discover')(fakeCoap);
});

test('supports cluster discovery', function(done) {
  var query = {
    cluster: FakeCluster,
    side: 's'
  }

  var discoveredClusters = [];

  discover(query, function(err, cluster) {
    discoveredClusters.push(cluster);
  });

  expect(fakeCoap.lastRequest).toBeDefined();

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: '2001::1'
    }
  });

  expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');
  done();
});

test('supports wildcard discovery', function(done) {
  var discoveredClusters = [];

  discover({}, function(err, cluster) {
    discoveredClusters.push(cluster);
  });

  expect(fakeCoap.lastRequest).toBeDefined();

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: '2001::1'
    }
  });

  expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');
  done();
});
