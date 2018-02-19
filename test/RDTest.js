require(__dirname + '/support/testHelper');

describe('RD', function() {
  var RD_IP = '2001::1';
  var RD_PORT = 5690;
  var zclip;

  beforeEach(function() {
    zclip = require(__appRoot)(new FakeCoap());
  });

  test('lookup uses RD ip and port', function() {
    var rd = zclip.RD({ ip: RD_IP, port: RD_PORT });
    rd.lookup({}, function(err, devices) {});

    expect(zclip.coap.lastRequest).toBeDefined();
    expect(zclip.coap.lastRequest.params.host).toEqual(RD_IP);
    expect(zclip.coap.lastRequest.params.port).toEqual(RD_PORT);
  });

  test('lookup with default port', function() {
    var rd = zclip.RD({ ip: RD_IP });
    rd.lookup({}, function(err, devices) {});

    expect(zclip.coap.lastRequest).toBeDefined();
    expect(zclip.coap.lastRequest.params.host).toEqual(RD_IP);
    expect(zclip.coap.lastRequest.params.port).toEqual(5683);
  });

  test('lookup query with uid param', function() {
    var query = { uid: 'ABC123' }

    var rd = zclip.RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(zclip.coap.lastRequest).toBeDefined();
      expect(zclip.coap.lastRequest.params.query).toEqual('ep=ni:///sha-256;ABC123');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
    });

    expect(zclip.coap.lastRequest).toBeDefined();
    zclip.coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl>;rt=urn:zcl')
    });
  });

  test('lookup query without params sends cluster wildcard', function() {
    var query = {}

    var rd = zclip.RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(zclip.coap.lastRequest).toBeDefined();
      expect(zclip.coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(zclip.coap.lastRequest).toBeDefined();
    zclip.coap.lastRequest.sendResponse({
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

    var rd = zclip.RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(zclip.coap.lastRequest).toBeDefined();
      expect(zclip.coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(zclip.coap.lastRequest).toBeDefined();
    zclip.coap.lastRequest.sendResponse({
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

    var rd = zclip.RD(RD_IP, RD_PORT);
    rd.lookup(query, function(err, devices) {
      expect(zclip.coap.lastRequest).toBeDefined();
      expect(zclip.coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(zclip.coap.lastRequest).toBeDefined();
    zclip.coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });
});

