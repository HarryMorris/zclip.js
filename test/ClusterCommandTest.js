require(__dirname + '/support/testHelper');

var cbor = require('cbor');

describe('ClusterCommand', () => {
  var coap;
  var Cluster;
  var ClusterCommand;

  beforeAll(() => {
    Cluster = require(__appRoot + 'lib/Cluster');
    ClusterCommand = require(__appRoot + 'lib/ClusterCommand');
  });

  beforeEach(() => {
    coap = new FakeCoap();
  });

  test('posts to command path', () => {
    var cluster = Cluster({
      clusterId: '6',
      endpoint: 1
    }, coap);

    var clusterCommand = ClusterCommand('0', {}, cluster);
    clusterCommand.call();

    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.method).toEqual('POST');
    expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/1/s6/c/0');
    expect(coap.lastRequest.ended).toBeTruthy();
  });

  test('posts encoded args to command path', () => {
    var cluster = Cluster({
      clusterId: '8',
      endpoint: 1
    }, coap);

    var commandMetaData = {
      name: 'moveToLevel',
      args: {
        0: { name: 'level' },
        1: { name: 'transitionTime' }
      }
    }

    var clusterCommand = ClusterCommand('0', commandMetaData, cluster);

    clusterCommand.call({
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

  test('calls callback with payload and responseCode', (done) => {
    var cluster = Cluster({
      clusterId: '8',
      endpoint: 1
    }, coap);

    var clusterCommand = ClusterCommand('0', {}, cluster);

    clusterCommand.call({}, (err, response, responseCode) => {
      expect(response).toEqual("{0: 1}");
      expect(responseCode).toEqual('2.01');
      done();
    });

    expect(coap.lastRequest).toBeDefined();

    coap.lastRequest.sendResponse({
      code: '2.01',
      payload: cbor.encode('{0: 1}')
    });
  });

  test('calls callback with coap error', (done) => {
    var cluster = Cluster({
      clusterId: '8',
      endpoint: 1
    }, coap);

    var clusterCommand = ClusterCommand('0', {}, cluster);

    clusterCommand.call({}, (err, response, responseCode) => {
      expect(err).toEqual('Nope');
      done();
    });

    expect(coap.lastRequest).toBeDefined();
    coap.lastRequest.sendError('Nope');
  });

  test('calls callback with error if missing arguments', (done) => {
    var cluster = Cluster({
      clusterId: '8',
      endpoint: 1
    }, coap);

    var commandMetaData = {
      name: 'moveToLevel',
      args: {
        0: { name: 'level' },
        1: { name: 'transitionTime' },
        2: { name: 'moveMode' }
      }
    }

    var clusterCommand = ClusterCommand('0', commandMetaData, cluster);

    clusterCommand.call({
      level: 100
    }, (err) => {
      expect(err).toBeDefined();
      expect(err.missingArgs).toEqual(['transitionTime', 'moveMode']);
      done();
    });

    expect(coap.lastRequest).not.toBeDefined();
  });
});


// describe('commands', function() {
//   test('can resolve ip with rd and uid', function(done) {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "Off"
//         }
//       }
//     }
//
//     var rdIp = '2001::1';
//     var rdPort = '5689';
//     var deviceIp = '2001::9';
//     var uid = 'abc123';
//     var basePath = '/zcl/e/1/s6/';
//
//     var clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.port = '5683';
//     clusterBase.rdIp = rdIp;
//     clusterBase.rdPort = rdPort;
//     clusterBase.uid = uid;
//     clusterBase.basePath = basePath;
//
//     fakeCoap.registerRequest({
//       hostname: rdIp,
//       port: rdPort,
//       method: 'GET',
//       pathname: 'rd-lookup/res',
//       query: `ep=ni:///sha-256;${uid}`
//     }, {
//       payload: new Buffer(`<coap://[${deviceIp}]/zcl>;rt=urn:zcl;ep=ni:///sha-256;${uid}`),
//       code: '2.04'
//     });
//
//     fakeCoap.registerRequest({
//       hostname: deviceIp,
//       port: '5683',
//       method: 'POST',
//       pathname: '/zcl/e/1/s6/c/0'
//     }, {
//       code: '2.01',
//       payload: ''
//     });
//
//     clusterBase.off(null, function(err, response) {
//       expect(response.responseCode).toEqual('2.01');
//       done();
//     });
//   });
//
//
//   test('encode args', function() {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "cmd",
//           "args": {
//             "0": {
//               "name": "arg1",
//             },
//             "1": {
//               "name": "arg2",
//             },
//             "2": {
//               "name": "arg3",
//             }
//           }
//         }
//       }
//     }
//
//     var clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.ip = '2001::1';
//     clusterBase.cmd({
//       arg1: 'foo',
//       arg2: 'bar',
//       arg3: 'baz'
//     });
//
//     expect(fakeCoap.lastRequest).toBeDefined();
//
//     var encodedPayload = fakeCoap.lastRequest.payload;
//     expect(encodedPayload).toBeDefined();
//
//     var decodedPayload = cbor.decodeFirstSync(encodedPayload);
//     expect(decodedPayload.get(0)).toEqual('foo');
//     expect(decodedPayload.get(1)).toEqual('bar');
//     expect(decodedPayload.get(2)).toEqual('baz');
//   });
//
//   test('requires all arguments', function() {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "cmd",
//           "args": {
//             "0": {
//               "name": "arg1",
//             },
//             "1": {
//               "name": "arg2",
//             }
//           }
//         }
//       }
//     }
//     var clusterBase = new ClusterBase(metaData, zclip);
//     var error;
//
//     clusterBase.cmd({
//       arg1: 'foo'
//     }, function(err) {
//       error = err;
//     });
//
//     expect(fakeCoap.lastRequest).not.toBeDefined();
//     expect(error).toBeDefined();
//     expect(error).toEqual('Missing arguments arg2.');
//   });
//
//   test('calls back with payload', function(done) {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "Off"
//         }
//       }
//     }
//
//     var clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.ip = '2001::1'
//
//     clusterBase.off(null, function(err, result) {
//       expect(result.response).toEqual('{0: 1}');
//       expect(result.responseCode).toEqual('2.01');
//       done();
//     });
//
//     expect(fakeCoap.lastRequest).toBeDefined();
//
//     fakeCoap.lastRequest.sendResponse({
//       code: '2.01',
//       payload: cbor.encode('{0: 1}')
//     });
//   });
//
//   test('calls back with empty response', function(done) {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "Off"
//         }
//       }
//     }
//
//     var ip = '192.168.1.1';
//     var port = 5683;
//     var basePath = '/zcl/e/1/s6/';
//
//     var clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.ip = ip;
//     clusterBase.port = port;
//     clusterBase.basePath = basePath;
//
//     clusterBase.off(null, function(err, result) {
//       expect(result.response).toEqual('');
//       expect(result.responseCode).toEqual('4.04');
//       done();
//     });
//
//     expect(fakeCoap.lastRequest).toBeDefined();
//     fakeCoap.lastRequest.sendResponse({
//       code: '4.04',
//       payload: new Buffer('')
//     });
//   });
//
//   test('calls back with error', function(done) {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "Off"
//         }
//       }
//     }
//
//     var clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.ip = '2001::1';
//
//     clusterBase.off(null, function(err, result) {
//       expect(err.message).toEqual('No reply in 3s');
//       done();
//     });
//
//     expect(fakeCoap.lastRequest).toBeDefined();
//     fakeCoap.lastRequest.sendError({
//       message: 'No reply in 3s'
//     });
//   });
// });
