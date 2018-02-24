var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function FakeCoap() {
  var registeredRequests = {};

  this.request = function(req) {
    var res = registeredRequests[requestKey(req)];

    this.lastRequest = new FakeRequest(req, res);
    return this.lastRequest;
  }

  this.createServer = function() {
    this.server = new FakeServer();
    return this.server;
  }

  this.registerRequest = function(req, res) {
    registeredRequests[requestKey(req)] = res;
  }

  function requestKey(req) {
    return [req.hostname, req.port, req.method, req.pathname, req.query].join('-');
  }
}

function FakeServer() {
  this.request = function(url, payload) {
    var req = new FakeServerReq(url, payload);
    this.emit('request', req, req.res);
    return req;
  }
}

util.inherits(FakeServer, EventEmitter);

function FakeServerReq(url, payload) {
  this.url = url;
  this.payload = payload;

  var ended = false;
  this.res = {
    end: function() {
      ended = true;
    }
  }

  this.hasEnded = function() {
    return ended;
  }
}

function FakeRequest(req, res) {
  this.params = req;

  this.eventCallbacks = {};

  this.on = function(event, callback) {
    this.eventCallbacks[event] = callback;

    if (res && event == 'response')
      callback(res);
  }

  this.write = function(payload) {
    this.payload = payload;
  }

  this.end = function() {
    this.ended = true;
  }

  this.setOption = function() {

  }

  this.sendResponse = function(response) {
    var responseCallback = this.eventCallbacks.response;
    responseCallback(response);
  }

  this.sendError = function(err) {
    var callback = this.eventCallbacks.error;
    callback(err);
  }
}

