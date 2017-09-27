require(__dirname + '/../support/testHelper');

var _ = require('lodash');
var FakeCli = require(__appRoot + 'test/support/FakeCli');

var fakeClusters = [];

var zclip = {
  clusters: {
    FakeCluster: FakeCluster
  }
}

var cmdHandler = require(__appRoot + 'cli/lib/cmdHandler')(zclip);

describe('cli zcl', function() {
  beforeEach(function() {
    fakeClusters = [];
  });

  describe('cmdHandler', function() {
    test('instantiates cluster with network params', function() {
      var cli = new FakeCli();

      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {
          port: 5900,
          endpoint: 1
        }
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.ip).toEqual('2001::1');
      expect(cluster.port).toEqual(5900);
      expect(cluster.endpoint).toEqual(1);
    });

    test('finds cluster by shorthand', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fake', 'command1', '2001::1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);
      expect(fakeClusters[0]).toBeInstanceOf(FakeCluster);
    });

    test('calls the specified command on the specified cluster', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);
      expect(fakeClusters[0].command1Called).toBeTruthy();
    });

    test('passes options to command', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { foo: 'bar' }
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);
      expect(fakeClusters[0].command1Args).toEqual({ foo: 'bar' });
    });

    test('prints response on success', function() {
      FakeCluster.response = { attr: 100 }
      FakeCluster.responseCode = '2.01'

      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { foo: 'bar' }
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cli.printed.toString()).toMatch(/2.01/);
      expect(cli.printed.toString()).toMatch(JSON.stringify(FakeCluster.response));
    });

    test('exits 0 success', function() {
      FakeCluster.response = { attr: 100 }
      FakeCluster.responseCode = '2.01'

      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cli.exitCode).toEqual(0);
    });

    test('prints error if IP not provided', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(cli.printedErrors.toString()).toMatch('IP')
    });

    test('prints help if cluster not found', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fooCluster', 'command1', '2001::1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(cli.printedErrors.toString()).toMatch('Error: Cluster not found')
      expect(cli.printed.toString()).toMatch('fakeCluster')
    });

    test('prints help if command not found', function() {
      var cli = new FakeCli();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'missingCommand', '2001::1'],
        options: {}
      }

      cmdHandler(zclCommand, cli);

      expect(cli.printedErrors.toString()).toMatch('Error: Command not found')
      expect(cli.printed.toString()).toMatch('command1')
    });

    describe('with --help', function() {
      test('prints cluster help if cluster not provided', function() {
        var cli = new FakeCli();
        var zclCommand = {
          keywords: ['cmd'],
          options: { help: true }
        }

        cmdHandler(zclCommand, cli);

        expect(cli.printedErrors.toString()).not.toMatch('Error: Cluster not found')
        expect(cli.printed.toString()).toMatch('fakeCluster')
      });

      test('prints command help if command not provided', function() {
        var cli = new FakeCli();
        var zclCommand = {
          keywords: ['cmd', 'fakeCluster'],
          options: { help: true }
        }

        cmdHandler(zclCommand, cli);

        expect(cli.printedErrors.toString()).not.toMatch('Error')
        expect(cli.printed.toString()).toMatch('command1')
      });

      xtest('prints attribute help if command provided', function() {
        var cli = new FakeCli();
        var zclCommand = {
          keywords: ['cmd', 'fakeCluster', 'command1'],
          options: { help: true }
        }

        cmdHandler(zclCommand, cli);

        expect(cli.printedErrors.toString()).not.toMatch('Error')
        expect(cli.printed.toString()).toMatch('command1')
      });
    });
  });
});

function FakeCluster(attrs) {
  this.ip = attrs.ip;
  this.port = attrs.port;
  this.endpoint = attrs.endpoint;
  this.meta = {
    commands: {
      0: {
        name: 'Command1'
      }
    }
  }

  fakeClusters.push(this);

  this.command1 = function(args, callback) {
    this.command1Args = args;
    this.command1Called = true;

    callback('', {
      response: FakeCluster.response,
      responseCode: FakeCluster.responseCode
    });
  }
}

function Callback() {
  this.handler = _.bind(function(error, message, exitCode) {
    this.error = error;
    this.message = message;
    this.exitCode = exitCode;
  }, this);
}
