require(__dirname + '/../support/testHelper');

var fakeCoap;
var zclip;

beforeAll(function() {
  fakeCoap = new FakeCoap();
  zclip = require(__appRoot)(fakeCoap);
});

test('discover query without params', function(done) {
  var query = {}

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  zclip.discover(query, function(err, devices) {
    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.*');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

test('discover query with cluster only', function(done) {
  var query = {
    clusterId: '6'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  zclip.discover(query, function(err, devices) {
    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.*');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

test('discover query with cluster and side', function(done) {
  var query = {
    clusterId: '6',
    clusterSide: 's'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  zclip.discover(query, function(err, devices) {
    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

    expect(devices.length).toEqual(1);
    expect(devices[0].ip).toEqual(deviceIp);
    expect(devices[0].name).toEqual('OnOffSwitch');
    done();
  });

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

