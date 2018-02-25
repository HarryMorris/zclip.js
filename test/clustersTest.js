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

describe('findClusterIdByName', () => {
  test('finds clusters by Pascal cased names', () => {
    var clusterId = zclip.clusters.findClusterIdByName('OnOff');
    expect(clusterId).toEqual('6');
  });

  test('finds clusters by camel cased names', () => {
    var clusterId = zclip.clusters.findClusterIdByName('onOff');
    expect(clusterId).toEqual('6');
  });

  test('finds clusters by downcase', () => {
    var clusterId = zclip.clusters.findClusterIdByName('onoff');
    expect(clusterId).toEqual('6');
  });

  test('returns null if not found', () => {
    var clusterId = zclip.clusters.findClusterIdByName('foo');
    expect(clusterId).not.toBeDefined();
  });
});

describe('clusterNames', () => {
  it('returns all cluster names', () => {
    expect(zclip.clusters.clusterNames()).toContain('OnOff');
    expect(zclip.clusters.clusterNames()).toContain('LevelControl');
  });
});
