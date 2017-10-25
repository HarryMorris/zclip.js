var util = require('util');
var EventEmitter = require('events').EventEmitter;

module.exports = function FakeCoap() {
  this.request = function(params) {
    this.lastRequest = new FakeRequest(params);
    return this.lastRequest;
  }

  this.createServer = function() {
    this.server = new FakeServer();
    return this.server;
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

function FakeRequest(params) {
  this.params = params;

  this.eventCallbacks = {};

  this.on = function(event, callback) {
    this.eventCallbacks[event] = callback;
  }

  this.write = function(payload) {
    this.payload = payload;
  }

  this.end = function() {
    this.ended = true;
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

