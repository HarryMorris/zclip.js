require(__dirname + '/../support/testHelper');

var _ = require('lodash');

var fakeClusters = [];

var clusters = {
  FakeCluster: FakeCluster
}

var zcl = require(__appRoot + 'cli/lib/zcl')(clusters);

beforeEach(function() {
  fakeClusters = [];
});

test('instantiates clusters with ip', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1', '2001::1'], {}, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(cluster.ip).toEqual('2001::1');
});

test('instantiates clusters with port', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1', '2001::1'], { port: 5900 }, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(cluster.port).toEqual(5900);
});

test('instantiates clusters with endpoint', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1', '2001::1'], { endpoint: 100 }, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(cluster.endpoint).toEqual(100);
});

test('calls the specified command on the specified cluster', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1', '2001::1'], {}, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(cluster.command1Called).toBeTruthy();
});

test('passes arguments to cluster', function() {
  var callback = new Callback();
  var args = { foo: 'bar' };

  zcl(['fakeCluster', 'command1', '2001::1'], args, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(cluster.command1Args).toEqual(args);
});

test('calls callback with message and exit code on success', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1', '2001::1'], {}, callback.handler);

  expect(fakeClusters.length).toEqual(1);

  var cluster = fakeClusters[0];
  expect(callback.message).toBeDefined();
  expect(callback.exitCode).toEqual(0);
});

test('calls callback with error if ip not provided', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'command1'], {}, callback.handler);

  expect(callback.error).toBeDefined();
  expect(callback.exitCode).toEqual(1);
});

test('calls callback with error if cluster not found', function() {
  var callback = new Callback();

  zcl(['fooCluster', 'command1', '2001::1'], {}, callback.handler);

  expect(callback.error).toBeDefined();
  expect(callback.exitCode).toEqual(1);
});

test('calls callback with error if function not found', function() {
  var callback = new Callback();

  zcl(['fakeCluster', 'fooCommand', '2001::1'], {}, callback.handler);

  expect(callback.error).toBeDefined();
  expect(callback.exitCode).toEqual(1);
});

function FakeCluster(attrs) {
  this.ip = attrs.ip;
  this.port = attrs.port;
  this.endpoint = attrs.endpoint;

  fakeClusters.push(this);

  this.command1 = function(args) {
    this.command1Args = args;
    this.command1Called = true;
  }
}

function Callback() {
  this.handler = _.bind(function(error, message, exitCode) {
    this.error = error;
    this.message = message;
    this.exitCode = exitCode;
  }, this);
}
