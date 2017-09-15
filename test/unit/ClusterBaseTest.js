require(__dirname + '/support/testHelper');

var cbor = require('cbor');

var ClusterBase;
var fakeCoap;

beforeAll(function() {
  ClusterBase = require(__appRoot + 'lib/ClusterBase')();
  fakeCoap = new FakeCoap();
});

test('Assigns meta data', function() {
  var metaData = { code: '0x0006' };

  var clusterBase = new ClusterBase(metaData, fakeCoap);

  expect(clusterBase.meta).toEqual(metaData);
});

test('Builds commands from meta data', function() {
  var metaData = {
    "commands": {
      "0": {
        "name": "Off"
      },
      "1": {
        "name": "On"
      }
    }
  }

  var clusterBase = new ClusterBase(metaData, fakeCoap);

  expect(clusterBase.on).toBeDefined();
  expect(clusterBase.off).toBeDefined();
});

test('Commands send coap', function() {
  var metaData = {
    "commands": {
      "0": {
        "name": "Off"
      }
    }
  }

  var ip = '192.168.1.1';
  var port = 5683;
  var basePath = '/zcl/e/1/s6/';

  var clusterBase = new ClusterBase(metaData, fakeCoap);
  clusterBase.ip = ip;
  clusterBase.port = port;
  clusterBase.basePath = basePath;

  clusterBase.off();
  expect(fakeCoap.lastRequest).toBeDefined();
  expect(fakeCoap.lastRequest.params.hostname).toEqual(ip);
  expect(fakeCoap.lastRequest.params.port).toEqual(port);
  expect(fakeCoap.lastRequest.params.method).toEqual('POST');
  expect(fakeCoap.lastRequest.params.pathname).toEqual('/zcl/e/1/s6/c/0');
  expect(fakeCoap.lastRequest.ended).toBeTruthy();
});

test('Commands map arguments in cbor', function() {
  var metaData = {
    "commands": {
      "0": {
        "name": "cmd",
        "args": [
          "arg1",
          "arg2",
          "arg3"
        ]
      }
    }
  }

  var ip = '192.168.1.1';
  var port = 5683;
  var basePath = '/zcl/e/1/s6/';

  var clusterBase = new ClusterBase(metaData, fakeCoap);
  clusterBase.ip = ip;
  clusterBase.port = port;
  clusterBase.basePath = basePath;

  clusterBase.cmd({
    arg1: 'foo',
    arg3: 'bar'
  });

  var encodedPayload = fakeCoap.lastRequest.payload;
  expect(encodedPayload).toBeDefined();

  var payload = cbor.decodeFirstSync(encodedPayload);
  expect(payload.get(0)).toEqual('foo');
  expect(payload.get(2)).toEqual('bar');
});

function FakeCoap() {
  this.request = function(params) {
    this.lastRequest = new FakeRequest(params);
    return this.lastRequest;
  }
}

function FakeRequest(params) {
  this.params = params;

  this.on = function(event, callback) {

  }

  this.write = function(payload) {
    this.payload = payload;
  }

  this.end = function() {
    this.ended = true;
  }
}

