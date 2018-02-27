var fs = require('fs');

require(__dirname + '/support/testHelper');

describe('init', () => {
  it('parses and caches json as meta', () => {
    var deviceMetaDataFile = 'test/support/deviceMetaData.json';

    var devices = require(__appRoot + 'lib/devices');
    devices.init(__appRoot + deviceMetaDataFile);

    var expectedMeta = JSON.parse(fs.readFileSync(deviceMetaDataFile));
    expect(devices.meta).toEqual(expectedMeta);

    var devices2 = require(__appRoot + 'lib/devices');
    expect(devices2.meta).toEqual(expectedMeta);
  });
});

describe('build', () => {
  test('returns a new device with metadata', () => {
    var devices = require(__appRoot + 'lib/devices');

    var device = devices.build('0', {
      ip: '2001::1'
    });

    expect(device).toBeDefined();
    expect(device.name).toEqual('OnOffSwitch')
    expect(device.ip).toEqual('2001::1')
  });

  test('returns unknown deviceId not provided', () => {
    var devices = require(__appRoot + 'lib/devices');

    var device = devices.build();

    expect(device).toBeDefined();
    expect(device.name).toEqual('Unknown')
  });

  test('returns unknown device if not found', () => {
    var devices = require(__appRoot + 'lib/devices');

    var device = devices.build('99', {
      ip: '2001::1'
    });

    expect(device).toBeDefined();
    expect(device.name).toEqual('Unknown')
    expect(device.ip).toEqual('2001::1')
  });
});

