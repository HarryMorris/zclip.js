require(__dirname + '/support/testHelper');

describe('RD', function() {
  var fakeCoap;
  var RD;
  var RD_IP = '2001::1';
  var RD_PORT = 5690;
  var zclip;

  beforeAll(function() {
    zclip = require(__appRoot)(fakeCoap);
  });

  beforeEach(function() {
    fakeCoap = new FakeCoap();
    RD = require(__dirname + '/../lib/RD')(fakeCoap, zclip);
  });

  test('lookup uses RD ip and port', function() {
    var rd = RD({ ip: RD_IP, port: RD_PORT });
    rd.lookup({}, function(err, devices) {});

    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.host).toEqual(RD_IP);
    expect(fakeCoap.lastRequest.params.port).toEqual(RD_PORT);
  });

  test('lookup with default port', function() {
    var rd = RD({ ip: RD_IP });
    rd.lookup({}, function(err, devices) {});

    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.host).toEqual(RD_IP);
    expect(fakeCoap.lastRequest.params.port).toEqual(5683);
  });

  test('lookup query without params sends cluster wildcard', function() {
    var query = {}

    var rd = RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(fakeCoap.lastRequest).toBeDefined();
      expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });

  test('lookup query with only cluster send cluster side wildcard', function() {
    var query = {
      clusterId: '6'
    }

    var rd = RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(fakeCoap.lastRequest).toBeDefined();
      expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });

  test('lookup query with cluster and side', function() {
    var query = {
      clusterId: '6',
      clusterSide: 's'
    }

    var rd = RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(fakeCoap.lastRequest).toBeDefined();
      expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(fakeCoap.lastRequest).toBeDefined();
    fakeCoap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });
});

