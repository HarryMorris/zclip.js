require(__dirname + '/support/testHelper');

var coap;
var discover;

beforeAll(() => {
  coap = new FakeCoap();
  discover = require(__appRoot + 'lib/discover')(coap);
});

test('discover query without params', (done) => {
  var query = {}

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  discover(query, (err, devices) => {
    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  coap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

test('discover query with uid', (done) => {
  var query = {
    uid: 'ABC123'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl>;rt=urn:zcl';

  discover(query, (err, devices) => {
    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.query).toEqual('ep=ni:///sha-256;ABC123');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    done();
  });

  coap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

test('discover query with cluster only', (done) => {
  var query = {
    clusterId: '6'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  discover(query, (err, devices) => {
    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.*');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  coap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

test('discover query with cluster and side', (done) => {
  var query = {
    clusterId: '6',
    clusterSide: 's'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  discover(query, (err, devices) => {
    expect(coap.lastRequest).toBeDefined();
    expect(coap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  coap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

