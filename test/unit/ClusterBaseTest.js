require(__dirname + '/support/testHelper');

var ClusterBase;

beforeAll(function() {
  ClusterBase = require(__appRoot + 'lib/ClusterBase')();
});

test('Assigns meta data', function() {
  var metaData = { code: '0x0006' };

  var clusterBase = new ClusterBase(metaData);

  expect(clusterBase.meta).toEqual(metaData);
});
