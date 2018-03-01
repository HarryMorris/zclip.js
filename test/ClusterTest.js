require(__dirname + '/support/testHelper');


describe('Cluster', () => {
  var AttributeCollection;
  var CommandCollection;
  var Cluster;
  var coap;

  beforeAll(() => {
    AttributeCollection = require(__zclipRoot + 'lib/AttributeCollection');
    CommandCollection = require(__zclipRoot + 'lib/CommandCollection');
    Cluster = require(__zclipRoot + 'lib/Cluster');
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

  describe('availableCommands', () => {
    it('returns a list of available commands', () => {
      var commandCollection = CommandCollection({
        0: { name: 'Off' },
        1: { name: 'On'  }
      });

      var cluster = Cluster({
        commandCollection: commandCollection
      });

      expect(cluster.availableCommands()).toEqual(['off', 'on']);
    });
  });

  describe('argsForCommand', () => {
    it('returns a list of args for a given command', () => {
      var commandCollection = CommandCollection({
        0: {
          name: 'moveToLevel',
          args: {
            0: { name: 'level', datatype: 'int' },
            1: { name: 'transitionTime', datatype: 'uint' }
          }
        }
      });

      var cluster = Cluster({
        commandCollection: commandCollection
      }, coap);

      expect(cluster.argsForCommand('moveToLevel')).toEqual([
        { name: 'level', datatype: 'int' },
        { name: 'transitionTime', datatype: 'uint' }
      ]);
    });
  });

  describe('read', () => {
    test('sends an attribute request', () => {
      var cluster = Cluster({
        clusterId: '6',
        ip: '::1',
        port: 5684,
        endpoint: 2,
        side: 's'
      }, coap);


      cluster.read();

      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.hostname).toEqual('::1');
      expect(coap.lastRequest.params.port).toEqual(5684);
      expect(coap.lastRequest.params.method).toEqual('GET');
      expect(coap.lastRequest.params.pathname).toEqual('/zcl/e/2/s6/a');
      expect(coap.lastRequest.params.query).toEqual('f=*');
      expect(coap.lastRequest.ended).toBeTruthy();
    });

    test('calls back with decoded attributes', (done) => {
      var attributeCollection = AttributeCollection({
        0: { name: 'sceneCount' },
        1: { name: 'currentScene' }
      });

      var cluster = Cluster({
        clusterId: '5',
        ip: '::1',
        attributeCollection: attributeCollection
      }, coap);

      cluster.read({}, (err, response, code) => {
        expect(coap.lastRequest).toBeDefined();
        expect(response.sceneCount).toEqual(2);
        expect(response.currentScene).toEqual(1)
        done();
      });

      var responsePayload = new Map();
      responsePayload.set(0, { v: 2 });
      responsePayload.set(1, { v: 1 });

      coap.lastRequest.sendResponse({
        code: '2.04',
        payload: cbor.encode(responsePayload)
      });
    });

    test('decodes empty response', (done) => {
      var cluster = Cluster({
        clusterId: '5',
        ip: '::1'
      }, coap);

      cluster.read({}, (err, response, code) => {
        expect(response).toEqual({});
        done();
      });

      coap.lastRequest.sendResponse({
        code: '4.04',
        payload: cbor.encode('')
      });
    });

    test('calls back with error', (done) => {
      var cluster = Cluster({
        clusterId: '5',
        ip: '::1'
      }, coap);

      cluster.read({}, (err, response, code) => {
        expect(err).toEqual('Nope');
        done();
      });

      coap.lastRequest.sendError('Nope');
    });
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

  describe('request', () => {
    describe('without ip', () => {
      test('can resolve ip with rd and uid', function(done) {
        var deviceIp = '2001::9';
        var uid = 'abc123';
        var rdIp = '2001::1';
        var rdPort = '5689';

        var cluster = Cluster({
          clusterId: '6',
          uid: uid,
          rdIp: rdIp,
          rdPort: rdPort
        }, coap);

        coap.registerRequest({
          hostname: rdIp,
          port: rdPort,
          method: 'GET',
          pathname: 'rd-lookup/res',
          query: `ep=ni:///sha-256;${uid}`
        }, {
          payload: new Buffer(`<coap://[${deviceIp}]/zcl>;rt=urn:zcl;ep=ni:///sha-256;${uid}`),
          code: '2.04'
        });

        coap.registerRequest({
          hostname: deviceIp,
          port: '5683',
          method: 'GET',
          pathname: '/zcl/e/1/s6/foo'
        }, {
          code: '2.01',
          payload: cbor.encode({ 0: 1 })
        });

        cluster.request('GET', 'foo', null, null, (err, response, responseCode) => {
          expect(responseCode).toEqual('2.01');
          done()
        });
      });

      test.skip('returns an error if resource not found', function(done) {
        var deviceIp = '2001::9';
        var uid = 'abc123';
        var rdIp = '2001::1';
        var rdPort = '5689';

        var cluster = Cluster({
          clusterId: '6',
          uid: uid,
          rdIp: rdIp,
          rdPort: rdPort
        }, coap);

        coap.registerRequest({
          hostname: rdIp,
          port: rdPort,
          method: 'GET',
          pathname: 'rd-lookup/res',
          query: `ep=ni:///sha-256;${uid}`
        }, {
          payload: new Buffer(''),
          code: '4.04'
        });

        cluster.request('GET', 'foo', null, null, (err, response, responseCode) => {
          expect(err).toBeDefined();
          done()
        });
      });
    });
  });
});

