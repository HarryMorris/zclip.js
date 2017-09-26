require(__dirname + '/../support/testHelper');

var _ = require('lodash');

var fakeClusters = [];

var zclip = {
  clusters: {
    FakeCluster: FakeCluster
  }
}

var zcl = require(__appRoot + 'cli/lib/zcl')(zclip);

describe('cli', function() {
  beforeEach(function() {
    fakeClusters = [];
  });

  describe('zcl cmd', function() {
    test('instantiates clusters with ip', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {}
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.ip).toEqual('2001::1');
    });

    test('instantiates clusters with port', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { port: 5900 }
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.port).toEqual(5900);
    });

    test('instantiates clusters with endpoint', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { endpoint: 100 }
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.endpoint).toEqual(100);
    });

    test('finds cluster by shorthand', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {}
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);
    });

    test('calls the specified command on the specified cluster', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: {}
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.command1Called).toBeTruthy();
    });

    test('passes arguments to cluster', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { foo: 'bar' }
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(cluster.command1Args).toEqual({ foo: 'bar' });
    });

    test('calls callback with result and exit code on success', function() {
      FakeCluster.response = { attr: 100 }
      FakeCluster.responseCode = '2.01'

      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1', '2001::1'],
        options: { foo: 'bar' }
      }

      zcl(zclCommand, callback.handler);

      expect(fakeClusters.length).toEqual(1);

      var cluster = fakeClusters[0];
      expect(callback.message).toMatch(/2.01/);
      expect(callback.message).toMatch(JSON.stringify(FakeCluster.response));
      expect(callback.exitCode).toEqual(0);
    });

    test('calls callback with error if ip not provided', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'command1'],
        options: { foo: 'bar' }
      }

      zcl(zclCommand, callback.handler);

      expect(callback.error).toBeDefined();
      expect(callback.exitCode).toEqual(1);
    });

    test('calls callback with error if cluster not found', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fooCluster', 'command1', '2001::1'],
        options: { foo: 'bar' }
      }

      zcl(zclCommand, callback.handler);

      expect(callback.error).toBeDefined();
      expect(callback.exitCode).toEqual(1);
    });

    test('calls callback with error if function not found', function() {
      var callback = new Callback();
      var zclCommand = {
        keywords: ['cmd', 'fakeCluster', 'missingCommand', '2001::1'],
        options: { foo: 'bar' }
      }

      zcl(zclCommand, callback.handler);

      expect(callback.error).toBeDefined();
      expect(callback.exitCode).toEqual(1);
    });
  });
});

function FakeCluster(attrs) {
  this.ip = attrs.ip;
  this.port = attrs.port;
  this.endpoint = attrs.endpoint;

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
