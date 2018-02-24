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

