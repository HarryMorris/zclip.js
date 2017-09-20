require(__dirname + '/support/testHelper');

var zclip;

beforeAll(() => {
  zclip = require(__appRoot)();
});

test('Clusters are loaded', () => {
  expect(zclip.clusters.OnOffCluster).toBeDefined();
});

test('Overrides are loaded', () => {
  var onOffCluster = new zclip.clusters.OnOffCluster();
  expect(onOffCluster.toggle).toBeDefined();
});
