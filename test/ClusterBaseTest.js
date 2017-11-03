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

describe('init', function() {
  test('assigns meta data', function() {
    var metaData = { code: '0x0006' };

    var clusterBase = new ClusterBase(metaData, fakeCoap);

    expect(clusterBase.meta).toEqual(metaData);
  });

  test('builds commands from meta data', function() {
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
});

describe('command classes', function() {
  it('can encode payload', function() {
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

    var cluster = new ClusterBase(metaData, fakeCoap);
    expect(cluster.commands.Cmd).toBeDefined();

    var cmd = new cluster.commands.Cmd({
      arg1: 100,
      arg2: 200,
    });

    var payload = new Map();
    payload.set(0, 100);
    payload.set(1, 200);

    expect(cmd.payload).toEqual(cbor.encode(payload));
  });
});

describe('commands', function() {
  test('send coap request with correct params', function() {
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

  test('encode args', function() {
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

    var clusterBase = new ClusterBase(metaData, fakeCoap);
    clusterBase.cmd({
      arg1: 'foo',
      arg2: 'bar',
      arg3: 'baz'
    });

    expect(fakeCoap.lastRequest).toBeDefined();

    var encodedPayload = fakeCoap.lastRequest.payload;
    expect(encodedPayload).toBeDefined();

    var decodedPayload = cbor.decodeFirstSync(encodedPayload);
    expect(decodedPayload.get(0)).toEqual('foo');
    expect(decodedPayload.get(1)).toEqual('bar');
    expect(decodedPayload.get(2)).toEqual('baz');
  });

  test('requires all arguments', function() {
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
    var clusterBase = new ClusterBase(metaData, fakeCoap);
    var error;

    clusterBase.cmd({
      arg1: 'foo'
    }, function(err) {
      error = err;
    });

    expect(fakeCoap.lastRequest).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error).toEqual('Missing arguments arg2.');
  });

  test('calls back with payload', function(done) {
    var metaData = {
      "commands": {
        "0": {
          "name": "Off"
        }
      }
    }

    var clusterBase = new ClusterBase(metaData, fakeCoap);
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

  test('calls back with empty response', function(done) {
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
      expect(result.response).toEqual('');
      expect(result.responseCode).toEqual('4.04');
      done();
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendResponse({
      code: '4.04',
      payload: new Buffer('')
    });
  });

  test('calls back with error', function(done) {
    var metaData = {
      "commands": {
        "0": {
          "name": "Off"
        }
      }
    }

    var clusterBase = new ClusterBase(metaData, fakeCoap);
    clusterBase.off(null, function(err, result) {
      expect(err.message).toEqual('No reply in 3s');
      done();
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendError({
      message: 'No reply in 3s'
    });
  });
});

describe('read', function() {
  test('sends an attribute request', function(done) {
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

  test('decodes attribute response', function(done) {
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

    var clusterBase = new ClusterBase(metaData, fakeCoap);

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

  test('decodes empty response', function(done) {
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

    var clusterBase = new ClusterBase(metaData, fakeCoap);

    clusterBase.read({}, function(err, result) {
      expect(result.responseCode).toEqual('4.04');
      expect(result.response).toEqual('');
      done();
    });

    fakeCoap.lastRequest.sendResponse({
      code: '4.04',
      payload: new Buffer('')
    });
  });

  test('calls back with error', function(done) {
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

    var clusterBase = new ClusterBase(metaData, fakeCoap);

    clusterBase.read({}, function(err, result) {
      expect(err.message).toEqual('No reply in 3s');
      done();
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendError({
      message: 'No reply in 3s'
    });
  });
});

describe('listen', function() {
  var coapServer;
  var clusterBase;

  beforeEach(function() {
    var metaData = {
      "commands": {
        "0": {
          "name": "moveToLevel",
          "args": {
            "0": {
              "name": "level",
            },
            "1": {
              "name": "transitionTime",
            }
          }
        }
      }
    }

    clusterBase = new ClusterBase(metaData, fakeCoap);
    clusterBase.basePath = '/zcl/e/1/s6/';

    coapServer = fakeCoap.createServer();
  });

  test('fires command handler when coap server receives command', function() {
    const moveToLevelHandler = jest.fn();
    clusterBase.moveToLevelHandler = moveToLevelHandler;
    clusterBase.listen(coapServer);

    coapServer.request('/zcl/e/1/s6/c/0');

    expect(moveToLevelHandler).toHaveBeenCalled();
  });

  test('parses payload', function() {
    var commandRequest;

    clusterBase.moveToLevelHandler = function(request, response) {
      commandRequest = request;
    };

    clusterBase.listen(coapServer);

    var payload = new Map();
    payload.set(0, '100');
    payload.set(1, '5');

    coapServer.request('/zcl/e/1/s6/c/0', cbor.encode(payload));

    expect(commandRequest.payload.level).toEqual('100');
    expect(commandRequest.payload.transitionTime).toEqual('5');
  });

  test('response.send ends response', function() {
    clusterBase.listen(coapServer);
    clusterBase.moveToLevelHandler = function(request, response) {
      response.send();
    };

    var request = coapServer.request('/zcl/e/1/s6/c/0');

    expect(request.hasEnded()).toBeTruthy();
  });


  test('ignores requests for other endpoints', function() {
    clusterBase.listen(coapServer);

    const moveToLevelHandler = jest.fn();
    clusterBase.moveToLevelHandler = moveToLevelHandler;

    coapServer.request('/zcl/e/2/s6/c/0');

    expect(moveToLevelHandler).not.toHaveBeenCalled();
  });

  test('ignores requests for other clusters', function() {
    clusterBase.listen(coapServer);

    const moveToLevelHandler = jest.fn();
    clusterBase.moveToLevelHandler = moveToLevelHandler;

    coapServer.request('/zcl/e/1/s9/c/0');

    expect(moveToLevelHandler).not.toHaveBeenCalled();
  });

  test('ignores unknown commands', function() {
    clusterBase.listen(coapServer);

    const moveToLevelHandler = jest.fn();
    clusterBase.moveToLevelHandler = moveToLevelHandler;

    coapServer.request('/zcl/e/1/s6/c/9');

    expect(moveToLevelHandler).not.toHaveBeenCalled();
  });
});

describe('.commandArgs', function() {
  test('returns a sorted list of args for a given command', function() {
    var metaData = {
      "commands": {
        "0": {
          "name": "command1",
          "args": {
            "0": {
              "name": "arg1",
              "datatype": "uint8"
            },
            "1": {
              "name": "arg2",
              "datatype": "uint16"
            }
          }
        }
      }
    }

    var cluster = new ClusterBase(metaData, fakeCoap);
    expect(cluster.commandArgs('command1')).toEqual([
      { name: 'arg1', datatype: 'uint8' },
      { name: 'arg2', datatype: 'uint16' }
    ]);
  });
});

