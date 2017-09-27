require(__dirname + '/support/testHelper');

var cbor = require('cbor');
var FakeCoap = require(__appRoot + 'test/support/FakeCoap');

var zclip;
var fakeCoap;

beforeAll(() => {
  fakeCoap = new FakeCoap();
  zclip = require(__appRoot)(fakeCoap);
});

test('Clusters are loaded', () => {
  expect(zclip.clusters.OnOff).toBeDefined();
});

test('Overrides are loaded', () => {
  var onOff = new zclip.clusters.OnOff();
  expect(onOff.toggle).toBeDefined();
});

test('Sends commands', function() {
  var levelControl = new zclip.clusters.LevelControl({
    ip: '::1',
    port: 5600,
    endpoint: 2
  });

  levelControl.moveToLevel({
    level: 10,
    transitionTime: 0
  }, function() {
    console.log(arguments);
  });

  var lastRequest = fakeCoap.lastRequest;
  expect(lastRequest).toBeDefined();
  expect(lastRequest.params.hostname).toEqual('::1');
  expect(lastRequest.params.port).toEqual(5600);
  expect(lastRequest.params.pathname).toEqual('/zcl/e/2/s8/c/0');
  expect(lastRequest.payload).toBeDefined();

  var decodedPayload = cbor.decodeFirstSync(lastRequest.payload);
  expect(decodedPayload.get(0)).toEqual(10);
  expect(decodedPayload.get(1)).toEqual(0);
});
