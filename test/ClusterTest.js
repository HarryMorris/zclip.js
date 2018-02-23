require(__dirname + '/support/testHelper');

describe('Cluster', () => {
  var Cluster;
  var coap;

  beforeAll(() => {
    Cluster = require(__appRoot + 'lib/Cluster');
  });

  beforeEach(() => {
    coap = new FakeCoap();
  });

  test('can be contructed without attrs', () => {
    var cluster = Cluster();
    expect(cluster).toBeDefined();
  });

  test('has default attrs', () => {
    var cluster = Cluster();

    expect(cluster.port).toEqual(5683);
    expect(cluster.endpoint).toEqual(1);
    expect(cluster.side).toEqual('s');
  });

  test('assigns attrs', () => {
    var cluster = Cluster({
      clusterId: '6',
      ip: '::1',
      port: 5684,
      endpoint: 2,
      side: 's',
      rdIp: '2001::2',
      rdPort: 5685
    });

    expect(cluster.clusterId).toEqual('6');
    expect(cluster.ip).toEqual('::1');
    expect(cluster.port).toEqual(5684);
    expect(cluster.endpoint).toEqual(2);
    expect(cluster.side).toEqual('s');
    expect(cluster.rdIp).toEqual('2001::2');
    expect(cluster.rdPort).toEqual(5685);
  });

  describe('bind', () => {
    it('posts ip destination to bind path', () => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.bind({
        ip: '2001::8',
        port: 5688,
        endpoint: 8
      });

      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.method).toEqual('POST');
      expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/2/s6/b');
      expect(coap.lastRequest.ended).toBeTruthy();

      var decodedPayload = cbor.decodeFirstSync(coap.lastRequest.payload);
      expect(decodedPayload).toBeDefined();
      expect(decodedPayload.u).toEqual('coap://[2001::8]:5688/zcl/e/8');
    });

    it('posts base64 encoded uid destination to bind path', () => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.bind({
        uid: 'acb123',
        port: 5688,
        endpoint: 8
      });

      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.method).toEqual('POST');
      expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/2/s6/b');
      expect(coap.lastRequest.ended).toBeTruthy();

      var decodedPayload = cbor.decodeFirstSync(coap.lastRequest.payload);
      expect(decodedPayload).toBeDefined();
      expect(decodedPayload.u).toEqual('coap://sha-256;rLEj:5688/zcl/e/8');
    });

    it('calls back with cbor decoded response', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.bind({
        uid: 'acb123',
        port: 5688,
        endpoint: 8
      }, (err, response, code) => {
        expect(response).toEqual({0: 1});
        expect(code).toEqual('2.01');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendResponse({
        code: '2.01',
        payload: cbor.encode({0: 1})
      });
    });

    it('calls back with error', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.bind({
        uid: 'acb123',
        port: 5688,
        endpoint: 8
      }, (err, response, code) => {
        expect(err).toEqual('Nope');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendError('Nope');
    });
  });

  describe('getBindings', () => {
    it('sends GET to bind path', () => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.getBindings();

      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.method).toEqual('GET');
      expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/2/s6/b');
      expect(coap.lastRequest.ended).toBeTruthy();
    });

    it('calls back with cbor decoded response', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.getBindings((err, response, code) => {
        expect(response).toEqual([1, 2]);
        expect(code).toEqual('2.04');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendResponse({
        code: '2.04',
        payload: cbor.encode([1, 2])
      });
    });

    it('calls back with error', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.getBindings((err, response, code) => {
        expect(err).toEqual('Nope');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendError('Nope');
    });
  });

  describe('deleteBinding', () => {
    it('sends DELETE to bind path', () => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.deleteBinding(99);

      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.method).toEqual('DELETE');
      expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/2/s6/b/99');
      expect(coap.lastRequest.ended).toBeTruthy();
    });

    it('calls back with cbor decoded response', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.deleteBinding(99, (err, response, code) => {
        expect(response).toEqual([1, 2]);
        expect(code).toEqual('2.04');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendResponse({
        code: '2.04',
        payload: cbor.encode([1, 2])
      });
    });

    it('calls back with error', (done) => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);

      cluster.deleteBinding({
        uid: 'acb123',
        port: 5688,
        endpoint: 8
      }, (err, response, code) => {
        expect(err).toEqual('Nope');
        done();
      });

      expect(coap.lastRequest).toBeDefined();
      coap.lastRequest.sendError('Nope');
    });
  });

  // describe('read', function() {
  //   test('sends an attribute request', function(done) {
  //     var metaData = { code: '0x0006' };
  //
  //     var clusterBase = new ClusterBase(metaData, zclip);
  //     var ip = '192.168.1.1';
  //     var port = 5683;
  //     var basePath = '/zcl/e/1/s6/';
  //
  //     var clusterBase = new ClusterBase(metaData, zclip);
  //
  //     clusterBase.ip = ip;
  //     clusterBase.port = port;
  //     clusterBase.basePath = basePath;
  //
  //     clusterBase.read({}, function(err, attributes) {
  //       expect(fakeCoap.lastRequest).toBeDefined();
  //       expect(fakeCoap.lastRequest.params.hostname).toEqual(ip);
  //       expect(fakeCoap.lastRequest.params.port).toEqual(port);
  //       expect(fakeCoap.lastRequest.params.method).toEqual('GET');
  //       expect(fakeCoap.lastRequest.params.pathname).toEqual('/zcl/e/1/s6/a');
  //       expect(fakeCoap.lastRequest.params.query).toEqual('f=*');
  //       expect(fakeCoap.lastRequest.ended).toBeTruthy();
  //       done();
  //     });
  //
  //     var payload = new Map();
  //
  //     payload.set(0, 'foo');
  //     fakeCoap.lastRequest.sendResponse({
  //       code: '2.01',
  //       payload: cbor.encode(payload)
  //     });
  //   });
  //
  //   test.skip('decodes attribute response', function(done) {
  //     var metaData = {
  //       code: '0x0006',
  //       attributes: {
  //         0: {
  //           name: 'attr1'
  //         },
  //         1: {
  //           name: 'attr2'
  //         }
  //       }
  //     };
  //
  //     var clusterBase = new ClusterBase(metaData, zclip);
  //
  //     var payload = new Map();
  //     payload.set(0, { v: 100 });
  //     payload.set(1, { v: 200 });
  //
  //     clusterBase.read({}, function(err, result) {
  //       expect(result.responseCode).toEqual('2.01');
  //       expect(result.response.attr1).toEqual(100);
  //       expect(result.response.attr2).toEqual(200);
  //       done();
  //     });
  //
  //     fakeCoap.lastRequest.sendResponse({
  //       code: '2.01',
  //       payload: cbor.encode(payload)
  //     });
  //   });
  //
  //   test.skip('decodes empty response', function(done) {
  //     var metaData = {
  //       code: '0x0006',
  //       attributes: {
  //         0: {
  //           name: 'attr1'
  //         },
  //         1: {
  //           name: 'attr2'
  //         }
  //       }
  //     };
  //
  //     var clusterBase = new ClusterBase(metaData, zclip);
  //
  //     clusterBase.read({}, function(err, result) {
  //       expect(result.responseCode).toEqual('4.04');
  //       expect(result.response).toEqual('');
  //       done();
  //     });
  //
  //     fakeCoap.lastRequest.sendResponse({
  //       code: '4.04',
  //       payload: new Buffer('')
  //     });
  //   });
  //
  //   test.skip('calls back with error', function(done) {
  //     var metaData = {
  //       code: '0x0006',
  //       attributes: {
  //         0: {
  //           name: 'attr1'
  //         },
  //         1: {
  //           name: 'attr2'
  //         }
  //       }
  //     };
  //
  //     var clusterBase = new ClusterBase(metaData, zclip);
  //
  //     clusterBase.read({}, function(err, result) {
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
});

//
// describe('listen', function() {
//   var coapServer;
//   var clusterBase;
//
//   beforeEach(function() {
//     var metaData = {
//       "commands": {
//         "0": {
//           "name": "moveToLevel",
//           "args": {
//             "0": {
//               "name": "level",
//             },
//             "1": {
//               "name": "transitionTime",
//             }
//           }
//         }
//       }
//     }
//
//     clusterBase = new ClusterBase(metaData, zclip);
//     clusterBase.basePath = '/zcl/e/1/s6/';
//
//     coapServer = fakeCoap.createServer();
//   });
//
//   test('fires command handler when coap server receives command', function() {
//     const moveToLevelHandler = jest.fn();
//     clusterBase.moveToLevelHandler = moveToLevelHandler;
//     clusterBase.listen(coapServer);
//
//     coapServer.request('/zcl/e/1/s6/c/0');
//
//     expect(moveToLevelHandler).toHaveBeenCalled();
//   });
//
//   test('parses payload', function() {
//     var commandRequest;
//
//     clusterBase.moveToLevelHandler = function(request, response) {
//       commandRequest = request;
//     };
//
//     clusterBase.listen(coapServer);
//
//     var payload = new Map();
//     payload.set(0, '100');
//     payload.set(1, '5');
//
//     coapServer.request('/zcl/e/1/s6/c/0', cbor.encode(payload));
//
//     expect(commandRequest.payload.level).toEqual('100');
//     expect(commandRequest.payload.transitionTime).toEqual('5');
//   });
//
//   test('response.send ends response', function() {
//     clusterBase.listen(coapServer);
//     clusterBase.moveToLevelHandler = function(request, response) {
//       response.send();
//     };
//
//     var request = coapServer.request('/zcl/e/1/s6/c/0');
//
//     expect(request.hasEnded()).toBeTruthy();
//   });
//
//
//   test('ignores requests for other endpoints', function() {
//     clusterBase.listen(coapServer);
//
//     const moveToLevelHandler = jest.fn();
//     clusterBase.moveToLevelHandler = moveToLevelHandler;
//
//     coapServer.request('/zcl/e/2/s6/c/0');
//
//     expect(moveToLevelHandler).not.toHaveBeenCalled();
//   });
//
//   test('ignores requests for other clusters', function() {
//     clusterBase.listen(coapServer);
//
//     const moveToLevelHandler = jest.fn();
//     clusterBase.moveToLevelHandler = moveToLevelHandler;
//
//     coapServer.request('/zcl/e/1/s9/c/0');
//
//     expect(moveToLevelHandler).not.toHaveBeenCalled();
//   });
//
//   test('ignores unknown commands', function() {
//     clusterBase.listen(coapServer);
//
//     const moveToLevelHandler = jest.fn();
//     clusterBase.moveToLevelHandler = moveToLevelHandler;
//
//     coapServer.request('/zcl/e/1/s6/c/9');
//
//     expect(moveToLevelHandler).not.toHaveBeenCalled();
//   });
// });
