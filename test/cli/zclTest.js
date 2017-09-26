require(__dirname + '/../support/testHelper');

var FakeCli = require(__appRoot + 'test/support/FakeCli');

describe('zcl', function() {
  test('calls provided hander', function() {
    var cli = new FakeCli();
    var cmdHandler = jest.fn();

    var zcl = require(__appRoot + 'cli/lib/zcl')({
      cmd: cmdHandler
    });

    var zclCommand = {
      keywords: ['cmd']
    }

    zcl(zclCommand, cli);

    expect(cmdHandler).toHaveBeenCalledWith(zclCommand, cli);
  });

  test('prints available commands if command not found', function() {
    var cli = new FakeCli();

    var zcl = require(__appRoot + 'cli/lib/zcl')({
      cmd: function() {},
      discover: function() {}
    });

    var zclCommand = {
      keywords: ['grep']
    }

    zcl(zclCommand, cli);

    expect(cli.printed.toString()).toMatch(/cmd/);
    expect(cli.printed.toString()).toMatch(/discover/);
  });
});

