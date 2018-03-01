require(__dirname + '/support/testHelper');

describe('RD', () => {
  var RD_IP = '2001::1';
  var RD_PORT = 5690;
  var coap;
  var RD;

  beforeAll(() => {
    RD = require(__zclipRoot + 'lib/RD');
  });

  beforeEach(() => {
    coap = new FakeCoap();
  });

  test('lookup uses RD ip and port', () => {
    var rd = RD({ ip: RD_IP, port: RD_PORT }, coap);
    rd.lookup({}, (err, devices) => {});

    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.hostname).toEqual(RD_IP);
    expect(coap.lastRequest.params.port).toEqual(RD_PORT);
  });

  test('lookup with default port', () => {
    var rd = RD({ ip: RD_IP }, coap);
    rd.lookup({}, (err, devices) => {});

    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.hostname).toEqual(RD_IP);
    expect(coap.lastRequest.params.port).toEqual(5683);
  });

  test('lookup query with uid param', () => {
    var query = { uid: 'ABC123' }

    var rd = RD({ ip: RD_IP, port: RD_PORT }, coap);
    rd.lookup(query, (err, devices) => {
      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.query).toEqual('ep=ni:///sha-256;ABC123');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
    });

    expect(coap.lastRequest).toBeDefined();
    coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl>;rt=urn:zcl')
    });
  });

  test('lookup query without params sends cluster wildcard', () => {
    var query = {}

    var rd = RD({ ip: RD_IP, port: RD_PORT }, coap);
    rd.lookup(query, (err, devices) => {
      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(coap.lastRequest).toBeDefined();
    coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });

  test('lookup query with only cluster send cluster side wildcard', () => {
    var query = {
      clusterId: '6'
    }

    var rd = RD({ ip: RD_IP, port: RD_PORT }, coap);
    rd.lookup(query, (err, devices) => {
      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.*');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(coap.lastRequest).toBeDefined();
    coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });

  test('lookup query with cluster and side', () => {
    var query = {
      clusterId: '6',
      clusterSide: 's'
    }

    var rd = RD({ ip: RD_IP, port: RD_PORT }, coap);
    rd.lookup(query, (err, devices) => {
      expect(coap.lastRequest).toBeDefined();
      expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

      expect(devices).toBeDefined();
      expect(devices[0].ip).toEqual('2001::4');
      expect(devices[0].name).toEqual('OnOffSwitch');
    });

    expect(coap.lastRequest).toBeDefined();
    coap.lastRequest.sendResponse({
      rsinfo: {
        address: '2001::4'
      },
      payload: new Buffer('</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s')
    });
  });
});

