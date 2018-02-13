require(__dirname + '/support/testHelper');

var zclip;

beforeAll(function() {
  zclip = require(__appRoot)(new FakeCoap());
});

test('builds devices with device with absolute link', function() {
  var deviceResponsePayload = [
    '<coap://[2001::1]/zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s',
    '<coap://[2001::2]/zcl/e/1/c6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.c'
  ].join(',');

  var coapResponse = {
    rsinfo: {
      address: '2001::4'
    },
    payload: new Buffer(deviceResponsePayload)
  };

  var discoveryResponse = new zclip.DiscoverResponse(coapResponse);

  expect(discoveryResponse.devices).toBeDefined();
  expect(discoveryResponse.devices.length).toEqual(2);

  expect(discoveryResponse.devices[0].ip).toEqual('2001::1');
  expect(discoveryResponse.devices[0].profileId).toEqual('0');
  expect(discoveryResponse.devices[0].clusterId).toEqual('6');
  expect(discoveryResponse.devices[0].cluster).toEqual('OnOff');
  expect(discoveryResponse.devices[0].clusterSide).toEqual('s');

  expect(discoveryResponse.devices[1].ip).toEqual('2001::2');
  expect(discoveryResponse.devices[1].profileId).toEqual('0');
  expect(discoveryResponse.devices[1].clusterId).toEqual('6');
  expect(discoveryResponse.devices[0].cluster).toEqual('OnOff');
  expect(discoveryResponse.devices[1].clusterSide).toEqual('c');
});

test('builds devices with device with relative link', function() {
  var deviceResponsePayload = [
    '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s',
    '</zcl/e/1/c6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.c'
  ].join(',');

  var coapResponse = {
    rsinfo: {
      address: '2001::4'
    },
    payload: new Buffer(deviceResponsePayload)
  };

  var discoveryResponse = new zclip.DiscoverResponse(coapResponse);

  expect(discoveryResponse.devices).toBeDefined();
  expect(discoveryResponse.devices.length).toEqual(2);

  expect(discoveryResponse.devices[0].ip).toEqual('2001::4');
  expect(discoveryResponse.devices[0].profileId).toEqual('0');
  expect(discoveryResponse.devices[0].clusterId).toEqual('6');
  expect(discoveryResponse.devices[0].clusterSide).toEqual('s');

  expect(discoveryResponse.devices[1].ip).toEqual('2001::4');
  expect(discoveryResponse.devices[1].profileId).toEqual('0');
  expect(discoveryResponse.devices[1].clusterId).toEqual('6');
  expect(discoveryResponse.devices[1].clusterSide).toEqual('c');
});

test('is empty if payload is null', function() {
  var coapResponse = {
    rsinfo: {
      address: '2001::1'
    },
    payload: null
  };

  var discoveryResponse = new zclip.DiscoverResponse(coapResponse);
  expect(discoveryResponse.devices.length).toEqual(0);
});

test('is null if payload is malformed', function() {
  var coapResponse = {
    rsinfo: {
      address: '2001::1'
    },
    payload: 'wrong'
  };

  var discoveryResponse = new zclip.DiscoverResponse(coapResponse);
  expect(discoveryResponse.devices.length).toEqual(0);
});

