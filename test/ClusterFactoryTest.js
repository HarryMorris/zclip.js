var cbor = require('cbor');

require(__dirname + '/support/testHelper');

var coap;
var ClusterFactory;

beforeEach(() => {
  coap = new FakeCoap();
  ClusterFactory = require(__zclipRoot + 'lib/ClusterFactory')({ coap: coap });
});

test('returns a Cluster constructor', () => {
  var clusterMetaData = { clusterId: '6' };

  var Cluster = ClusterFactory(clusterMetaData);
  var cluster = Cluster({ ip: '2001::1' });

  expect(cluster.ip).toEqual('2001::1');
});

test('passes meta data to Cluster constructor', () => {
  var clusterMetaData = { clusterId: '6' };

  var Cluster = ClusterFactory(clusterMetaData);
  var cluster = Cluster();

  expect(cluster.clusterId).toEqual('6');
});

describe('cluster commands', () => {
  test('are added to Cluster', () => {
    var clusterMetaData = {
      clusterId: '6',
      commands: {
        0: { name: 'Off' },
        1: { name: 'On'  }
      }
    };

    var Cluster = ClusterFactory(clusterMetaData);
    var cluster = Cluster();

    expect(cluster.on).toBeDefined();
    expect(cluster.off).toBeDefined();
  });

  test('cluster commands POST coap', () => {
    var clusterMetaData = {
      clusterId: '6',
      commands: {
        0: { name: 'Off' }
      }
    };

    var Cluster = ClusterFactory(clusterMetaData);
    var cluster = Cluster({
      ip: '::1',
      port: 5683
    });

    cluster.off();

    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.hostname).toEqual('::1');
    expect(coap.lastRequest.params.port).toEqual(5683);
    expect(coap.lastRequest.params.method).toEqual('POST');
    expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/1/s6/c/0');
    expect(coap.lastRequest.ended).toBeTruthy();
  });

  test('cluster commands POST encoded args', () => {
    var clusterMetaData = {
      clusterId: '8',
      commands: {
        0: {
          name: "moveToLevel",
          args: {
            0: { name: "level" },
            1: { name: "transitionTime" }
          }
        }
      }
    }

    var Cluster = ClusterFactory(clusterMetaData);
    var cluster = Cluster({
      ip: '::1',
      port: 5683
    });

    cluster.moveToLevel({
      level: 100,
      transitionTime: 10
    });

    expect(coap.lastRequest).toBeDefined();

    var encodedPayload = coap.lastRequest.payload;
    expect(encodedPayload).toBeDefined();

    var decodedPayload = cbor.decodeFirstSync(encodedPayload);
    expect(decodedPayload.get(0)).toEqual(100);
    expect(decodedPayload.get(1)).toEqual(10);
  });
});
