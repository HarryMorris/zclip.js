require(__dirname + '/../support/testHelper');

var fakeCoap;
var zclip;

beforeAll(function() {
  fakeCoap = new FakeCoap();
  zclip = require(__appRoot)(fakeCoap);
});

test('supports cluster discovery', function(done) {
  var query = {
    cluster: zclip.clusters.OnOff,
    side: 's'
  }

  var deviceIp = '2001::4';
  var deviceResponse = '</zcl/e/1/s6>;ze=urn:zcl:d.0.1;if=urn:zcl:c.v1;rt=urn:zcl:c.6.s';

  zclip.discover(query, function(err, device) {
    expect(fakeCoap.lastRequest).toBeDefined();
    expect(fakeCoap.lastRequest.params.query).toEqual('rt=urn:zcl:c.6.s');

    expect(device).toBeDefined();
    expect(device.ip).toEqual(deviceIp);
    expect(device.name).toEqual('OnOffSwitch');
    done();
  });

  fakeCoap.lastRequest.sendResponse({
    rsinfo: {
      address: deviceIp
    },
    payload: new Buffer(deviceResponse)
  });

});

