require(__dirname + '/support/testHelper');

var clusterMetaData;

beforeAll(() => {
  clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();
});


test('Builds clusters from meta data', () => {
  var target = {};

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);
  clusters.build(target);

  expect(target.OnOffCluster).toBeDefined();
});

test('Adds metadata to clusters', () => {
  var target = {};

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);
  clusters.build(target);

  expect(target.OnOffCluster.meta).toBeDefined();
  expect(target.OnOffCluster.meta.code).toEqual('0x0006');
});
