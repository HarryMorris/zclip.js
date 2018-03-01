var fs = require('fs');

require(__dirname + '/support/testHelper');

var metaDataFile = 'test/support/clusterMetaData.json';
var coap;
var clusters;

beforeAll(() => {
  coap = new FakeCoap();
  clusters = require(__zclipRoot + 'lib/clusters');
  clusters.init(__zclipRoot + metaDataFile, coap);
});

describe('init', () => {
  test('caches meta data from file', () => {
    var expectedMeta = JSON.parse(fs.readFileSync(metaDataFile));

    expect(clusters.meta).toEqual(expectedMeta);

    var clusters2 = require(__zclipRoot + 'lib/clusters');
    expect(clusters2.meta).toEqual(expectedMeta);
  });

  test('builds clusters from meta data', () => {
    expect(clusters.OnOff).toBeDefined();
  });

  test('adds metadata to cluster instances', () => {
    var onOff = clusters.OnOff();

    expect(onOff).toBeDefined();
    expect(onOff.clusterId).toEqual('6');
  });
});

describe('findNameById', () => {
  test('returns name', () => {
    var clusterName = clusters.findNameById('6')
    expect(clusterName).toEqual('OnOff');
  });
});

describe('findClusterIdByName', () => {
  test('finds clusters by Pascal cased names', () => {
    var clusterId = clusters.findClusterIdByName('OnOff');
    expect(clusterId).toEqual('6');
  });

  test('finds clusters by camel cased names', () => {
    var clusterId = clusters.findClusterIdByName('onOff');
    expect(clusterId).toEqual('6');
  });

  test('finds clusters by downcase', () => {
    var clusterId = clusters.findClusterIdByName('onoff');
    expect(clusterId).toEqual('6');
  });

  test('returns null if not found', () => {
    var clusterId = clusters.findClusterIdByName('foo');
    expect(clusterId).not.toBeDefined();
  });
});

describe('clusterNames', () => {
  it('returns all cluster names', () => {
    expect(clusters.clusterNames()).toContain('OnOff');
    expect(clusters.clusterNames()).toContain('LevelControl');
  });
});

