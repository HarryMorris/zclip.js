require(__dirname + '/support/testHelper');

describe('build', function() {
  test('returns a new device with metadata', function() {
    var devices = require(__appRoot + 'lib/devices')({
      '0': {
        name: 'onOffSwitch'
      }
    });

    var device = devices.build('0', {
      ip: '2001::1'
    });

    expect(device).toBeDefined();
    expect(device.name).toEqual('OnOffSwitch')
    expect(device.ip).toEqual('2001::1')
  });

  test('returns unknown device if not found', function() {
    var devices = require(__appRoot + 'lib/devices')({});

    var device = devices.build('0', {
      ip: '2001::1'
    });

    expect(device).toBeDefined();
    expect(device.name).toEqual('Unknown')
    expect(device.ip).toEqual('2001::1')
  });
});

