require(__dirname + '/support/testHelper');

var cbor = require('cbor');

var ClusterBase;
var fakeCoap;

beforeAll(function() {
  ClusterBase = require(__appRoot + 'lib/ClusterBase')();
});

beforeEach(function() {
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
        "args": {
          "0": {
            "name": "arg1",
          },
          "1": {
            "name": "arg2",
          },
          "2": {
            "name": "arg3",
          }
        }
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
    arg2: 'bar',
    arg3: 'baz'
  });

  expect(fakeCoap.lastRequest).toBeDefined();

  var encodedPayload = fakeCoap.lastRequest.payload;
  expect(encodedPayload).toBeDefined();

  var payload = cbor.decodeFirstSync(encodedPayload);
  expect(payload.get(0)).toEqual('foo');
  expect(payload.get(1)).toEqual('bar');
  expect(payload.get(2)).toEqual('baz');
});

test('Requires all command arguments', function() {
  var metaData = {
    "commands": {
      "0": {
        "name": "cmd",
        "args": {
          "0": {
            "name": "arg1",
          },
          "1": {
            "name": "arg2",
          }
        }
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

  var error;

  clusterBase.cmd({
    arg1: 'foo'
  }, function(err) {
    error = err;
  });

  expect(fakeCoap.lastRequest).not.toBeDefined();
  expect(error).toBeDefined();
});

test('Commands calls back with response', function(done) {
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

  clusterBase.off(null, function(err, result) {
    expect(result.response).toEqual('{0: 1}');
    expect(result.responseCode).toEqual('2.01');
    done();
  });

  expect(fakeCoap.lastRequest).toBeDefined();
  fakeCoap.lastRequest.sendResponse({
    code: '2.01',
    payload: cbor.encode('{0: 1}')
  });
});

test('Commands calls back with error', function(done) {
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

  clusterBase.off(null, function(err, result) {
    expect(err.message).toEqual('No reply in 3s');
    done();
  });

  expect(fakeCoap.lastRequest).toBeDefined();
  fakeCoap.lastRequest.sendError({
    message: 'No reply in 3s'
  });
});

test('read sends an attribute request', function(done) {
  var metaData = { code: '0x0006' };

  var clusterBase = new ClusterBase(metaData, fakeCoap);
  var ip = '192.168.1.1';
  var port = 5683;
  var basePath = '/zcl/e/1/s6/';

  var clusterBase = new ClusterBase(metaData, fakeCoap);

  clusterBase.ip = ip;
  clusterBase.port = port;
  clusterBase.basePath = basePath;

  clusterBase.read({}, function(err, attributes) {
    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.hostname).toEqual(ip);
    expect(fakeCoap.lastRequest.params.port).toEqual(port);
    expect(fakeCoap.lastRequest.params.method).toEqual('GET');
    expect(fakeCoap.lastRequest.params.pathname).toEqual('/zcl/e/1/s6/a');
    expect(fakeCoap.lastRequest.params.query).toEqual('f=*');
    expect(fakeCoap.lastRequest.ended).toBeTruthy();
    done();
  });

  var payload = new Map();

  payload.set(0, 'foo');
  fakeCoap.lastRequest.sendResponse({
    code: '2.01',
    payload: cbor.encode(payload)
  });
});

test('read decodes attribute response', function(done) {
  var metaData = {
    code: '0x0006',
    attributes: {
      0: {
        name: 'attr1'
      },
      1: {
        name: 'attr2'
      }
    }
  };

  var ip = '192.168.1.1';
  var port = 5683;
  var basePath = '/zcl/e/1/s6/';

  var clusterBase = new ClusterBase(metaData, fakeCoap);

  clusterBase.ip = ip;
  clusterBase.port = port;
  clusterBase.basePath = basePath;

  var payload = new Map();
  payload.set(0, { v: 100 });
  payload.set(1, { v: 200 });

  clusterBase.read({}, function(err, result) {
    expect(result.responseCode).toEqual('2.01');
    expect(result.response.attr1).toEqual(100);
    expect(result.response.attr2).toEqual(200);
    done();
  });

  fakeCoap.lastRequest.sendResponse({
    code: '2.01',
    payload: cbor.encode(payload)
  });
});

test('read calls back with error', function(done) {
  var metaData = {
    code: '0x0006',
    attributes: {
      0: {
        name: 'attr1'
      },
      1: {
        name: 'attr2'
      }
    }
  };

  var ip = '192.168.1.1';
  var port = 5683;
  var basePath = '/zcl/e/1/s6/';

  var clusterBase = new ClusterBase(metaData, fakeCoap);

  clusterBase.ip = ip;
  clusterBase.port = port;
  clusterBase.basePath = basePath;

  clusterBase.read({}, function(err, result) {
    expect(err.message).toEqual('No reply in 3s');
    done();
  });

  expect(fakeCoap.lastRequest).toBeDefined();
  fakeCoap.lastRequest.sendError({
    message: 'No reply in 3s'
  });
});

describe('.commandNames', function() {
  test('returns a sorted list of command Names', function() {
    var metaData = {
      "commands": {
        "0": {
          "name": "off"
        },
        "1": {
          "name": "on"
        }
      }
    }

    var cluster = new ClusterBase(metaData, fakeCoap);
    expect(cluster.commandNames()).toEqual(['off', 'on']);
  });
});

describe('.argNames', function() {
  test('returns a sorted list of args for a given command', function() {
    var metaData = {
      "commands": {
        "0": {
          "name": "command1",
          "args": {
            "0": {
              "name": "arg1",
            },
            "1": {
              "name": "arg2",
            }
          }
        }
      }
    }

    var cluster = new ClusterBase(metaData, fakeCoap);
    expect(cluster.argNames('command1')).toEqual(['arg1', 'arg2']);
  });
});

