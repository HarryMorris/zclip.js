require(__dirname + '/support/testHelper');

var clusterMetaData;

beforeAll(() => {
  clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();
});


test('returns clusters from meta data', () => {
  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  expect(clusters.OnOffCluster).toBeDefined();
});

test('Adds metadata to cluster instances', () => {

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  var onOffCluster = new clusters.OnOffCluster();

  expect(onOffCluster.meta).toBeDefined();
  expect(onOffCluster.meta.code).toEqual('0x0006');
});

