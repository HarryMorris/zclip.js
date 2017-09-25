require(__dirname + '/support/testHelper');

var clusterMetaData;

beforeAll(() => {
  clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();
});


test('Builds clusters from meta data', () => {
  var target = {};

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);
  clusters.build(target);

  expect(target.clusters.OnOffCluster).toBeDefined();
});

test('Adds metadata to cluster instances', () => {
  var target = {};

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);
  clusters.build(target);

  var onOffCluster = new target.clusters.OnOffCluster();

  expect(onOffCluster.meta).toBeDefined();
  expect(onOffCluster.meta.code).toEqual('0x0006');
});

