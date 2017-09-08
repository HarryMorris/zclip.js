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
