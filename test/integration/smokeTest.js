require(__dirname + '/support/testHelper');

var zclip;

beforeAll(() => {
  zclip = require(__appRoot);
});

test('Clusters are loaded', () => {
  expect(zclip.OnOffCluster).toBeDefined();
});
