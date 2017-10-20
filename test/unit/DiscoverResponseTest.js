require(__dirname + '/../support/testHelper');

var devices = { };
var deviceIp = '2001::4';
var DiscoverResponse;

function Device() { }

beforeEach(function() {
  devices.build = function(deviceId, attributes) {
    this.buildDeviceId = deviceId;
    this.buildAttributes = attributes;
    return new Device();
  }

  DiscoverResponse = require(__appRoot + 'lib/DiscoverResponse')(devices);
});

test('builds device with device id', function() {
  var deviceResponsePayload = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  var coapResponse = {
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponsePayload)
  };

  var discoveryResponse = new DiscoverResponse(coapResponse);
  expect(devices.buildDeviceId).toEqual('0');
  expect(devices.buildAttributes).toEqual({ ip: deviceIp });
  expect(discoveryResponse.device).toBeInstanceOf(Device);
});

test('is null if payload is null', function() {
  var coapResponse = {
    rsinfo: {
      address: deviceIp
    },
    payload: null
  };

  var discoveryResponse = new DiscoverResponse(coapResponse);
  expect(discoveryResponse.device).not.toBeDefined();
});

test('is null if payload is malformed', function() {
  var coapResponse = {
    rsinfo: {
      address: deviceIp
    },
    payload: 'wrong'
  };

  var discoveryResponse = new DiscoverResponse(coapResponse);
  expect(discoveryResponse.device).not.toBeDefined();
});

