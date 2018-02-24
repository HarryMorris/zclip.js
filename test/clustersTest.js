require(__dirname + '/support/testHelper');

var zclip;

beforeAll(() => {
  zclip = require('../')(new FakeCoap());
});


test('init builds clusters from meta data', () => {
  expect(zclip.clusters.OnOff).toBeDefined();
});

test('init adds metadata to cluster instances', () => {
  var onOff = zclip.clusters.OnOff();

  expect(onOff).toBeDefined();
  expect(onOff.clusterId).toEqual('6');
});

test('findNameById returns name', () => {
  var clusterName = zclip.clusters.findNameById('6')
  expect(clusterName).toEqual('OnOff');
});

