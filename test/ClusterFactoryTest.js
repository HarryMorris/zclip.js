var cbor = require('cbor');

require(__dirname + '/support/testHelper');

var coap;
var ClusterFactory;

beforeEach(function() {
  coap = new FakeCoap();
  ClusterFactory = require(__appRoot + 'lib/ClusterFactory')({ coap: coap });
});

test('returns a Cluster constructor', () => {
  var clusterMetaData = { clusterId: '6' };

  var Cluster = ClusterFactory(clusterMetaData);
  var cluster = Cluster({ ip: '2001::1' });

  expect(cluster.ip).toEqual('2001::1');
});

test('passes meta data to Cluster constructor', function() {
  var clusterMetaData = { clusterId: '6' };

  var Cluster = ClusterFactory(clusterMetaData);
  var cluster = Cluster();

  expect(cluster.clusterId).toEqual('6');
});

describe('cluster commands', function() {
  test('are added to Cluster', function() {
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

  test('cluster commands POST coap', function() {
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

  test('cluster commands POST encoded args', function() {
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



  // test('requires all arguments', function() {
  //   var metaData = {
  //     "commands": {
  //       "0": {
  //         "name": "cmd",
  //         "args": {
  //           "0": {
  //             "name": "arg1",
  //           },
  //           "1": {
  //             "name": "arg2",
  //           }
  //         }
  //       }
  //     }
  //   }
  //   var clusterBase = new ClusterBase(metaData, zclip);
  //   var error;
  //
  //   clusterBase.cmd({
  //     arg1: 'foo'
  //   }, function(err) {
  //     error = err;
  //   });
  //
  //   expect(fakeCoap.lastRequest).not.toBeDefined();
  //   expect(error).toBeDefined();
  //   expect(error).toEqual('Missing arguments arg2.');
  // });

  // test('calls back with payload', function(done) {
  //   var metaData = {
  //     "commands": {
  //       "0": {
  //         "name": "Off"
  //       }
  //     }
  //   }
  //
  //   var clusterBase = new ClusterBase(metaData, zclip);
  //   clusterBase.ip = '2001::1'
  //
  //   clusterBase.off(null, function(err, result) {
  //     expect(result.response).toEqual('{0: 1}');
  //     expect(result.responseCode).toEqual('2.01');
  //     done();
  //   });
  //
  //   expect(fakeCoap.lastRequest).toBeDefined();
  //
  //   fakeCoap.lastRequest.sendResponse({
  //     code: '2.01',
  //     payload: cbor.encode('{0: 1}')
  //   });
  // });

  // test('calls back with empty response', function(done) {
  //   var metaData = {
  //     "commands": {
  //       "0": {
  //         "name": "Off"
  //       }
  //     }
  //   }
  //
  //   var ip = '192.168.1.1';
  //   var port = 5683;
  //   var basePath = '/zcl/e/1/s6/';
  //
  //   var clusterBase = new ClusterBase(metaData, zclip);
  //   clusterBase.ip = ip;
  //   clusterBase.port = port;
  //   clusterBase.basePath = basePath;
  //
  //   clusterBase.off(null, function(err, result) {
  //     expect(result.response).toEqual('');
  //     expect(result.responseCode).toEqual('4.04');
  //     done();
  //   });
  //
  //   expect(fakeCoap.lastRequest).toBeDefined();
  //   fakeCoap.lastRequest.sendResponse({
  //     code: '4.04',
  //     payload: new Buffer('')
  //   });
  // });

  // test('calls back with error', function(done) {
  //   var metaData = {
  //     "commands": {
  //       "0": {
  //         "name": "Off"
  //       }
  //     }
  //   }
  //
  //   var clusterBase = new ClusterBase(metaData, zclip);
  //   clusterBase.ip = '2001::1';
  //
  //   clusterBase.off(null, function(err, result) {
  //     expect(err.message).toEqual('No reply in 3s');
  //     done();
  //   });
  //
  //   expect(fakeCoap.lastRequest).toBeDefined();
  //   fakeCoap.lastRequest.sendError({
  //     message: 'No reply in 3s'
  //   });
  // });
});
