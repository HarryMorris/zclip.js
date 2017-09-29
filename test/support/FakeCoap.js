module.exports = function FakeCoap() {
  this.request = function(params) {
    this.lastRequest = new FakeRequest(params);
    return this.lastRequest;
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

