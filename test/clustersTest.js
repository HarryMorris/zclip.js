require(__dirname + '/support/testHelper');

var clusterMetaData;

beforeAll(() => {
  clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();
});


test('returns clusters from meta data', () => {
  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  expect(clusters.OnOff).toBeDefined();
});

test('Adds metadata to cluster instances', () => {

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  var onOff = new clusters.OnOff();

  expect(onOff.meta).toBeDefined();
  expect(onOff.meta.code).toEqual('0x0006');
});

