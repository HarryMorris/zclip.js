require(__dirname + '/../support/testHelper');

describe('zclCommand', function() {
  test('parses keywords from argv', function() {
    var argv = [
      '/usr/bin/nodejs',
      '/home/pi/zclip/cli/zcl',
      'cmd',
      'onOff',
      'toggle',
      '2001:db8:385:9318:d92:e94:2222:9d44',
      '--port',
      '5683',
    ];

    var zclCommand = require(__appRoot + '/cli/lib/zclCommand')(argv);
    expect(zclCommand.keywords).toEqual([
      'cmd',
      'onOff',
      'toggle',
      '2001:db8:385:9318:d92:e94:2222:9d44',
    ]);
  });

  test('parses options from argv', function() {
    var argv = [
      '/usr/bin/nodejs',
      '/home/pi/zclip/cli/zcl',
      'cmd',
      'onOff',
      'toggle',
      '2001:db8:385:9318:d92:e94:2222:9d44',
      '--port',
      '5683',
      '--endpoint',
      '1'
    ];

    var zclCommand = require(__appRoot + '/cli/lib/zclCommand')(argv);
    expect(zclCommand.options).toEqual({
      port: 5683,
      endpoint: 1
    });
  });
});
