var base64url = require('base64url');
var cbor = require('cbor');

var AttributeCollection = require(__appRoot + 'lib/AttributeCollection');
var RD = require(__appRoot + 'lib/RD');

module.exports = ClusterConstructor;

function ClusterConstructor(attrs, coap) {
  return new Cluster(attrs, coap);
}

function Cluster(attrs, coap) {
  this.coap = coap;

  attrs = attrs || {};
  this.clusterId = attrs.clusterId;
  this.uid = attrs.uid;
  this.ip = attrs.ip;
  this.port = attrs.port || 5683;
  this.endpoint = attrs.endpoint || 1;
  this.side = attrs.side || 's';
  this.rdIp = attrs.rdIp;
  this.rdPort = attrs.rdPort;
  this.attributeCollection = attrs.attributeCollection || AttributeCollection();
  this.commandCollection = attrs.commandCollection;

  this.basePath = `/zcl/e/${this.endpoint}/${this.side}${this.clusterId}/`;
}

Cluster.prototype.availableCommands = function() {
  return this.commandCollection.availableCommands();
};

Cluster.prototype.argsForCommand = function(commandName) {
  return this.commandCollection.argsForCommand(commandName);
};

Cluster.prototype.read = function(args, callback) {
  var allAttributesQuery = 'f=*';

  this.get('a', allAttributesQuery, (err, responsePayload, responseCode) => {
    if (err) {
      callback(err);
      return;
    }

    var decodedPayload = this.attributeCollection.decode(responsePayload);
    callback(null, decodedPayload, responseCode);
  });
};

Cluster.prototype.bind = function(args, callback) {
  var destinationAddress;

  if (args.uid) {
    destinationAddress = 'sha-256;' + base64url.encode(args.uid, 'hex');
  } else {
    destinationAddress = `[${args.ip}]`;
  }

  var destinationUri = `coap://${destinationAddress}:${args.port}/zcl/e/${args.endpoint}`
  var payload = cbor.encode({ u: destinationUri });
  this.post('b', payload, callback);
}

Cluster.prototype.getBindings = function(callback) {
  this.get('b', null, callback);
}

Cluster.prototype.deleteBinding = function(bindId, callback) {
  this.delete('b/' + bindId, callback);
}

Cluster.prototype.request = function(method, uri, query, payload, callback) {
  this.fetchIp((err, ip) => {
    var request = this.coap.request({
      hostname: this.ip,
      port: this.port,
      method: method,
      pathname: this.basePath + uri,
      query: query
    });

    if (payload)
      request.write(payload);

    request.on('response', (response) => {
      var payload;

      if (response.payload && response.payload.length)
        payload = cbor.decodeFirstSync(response.payload);

      callback(null, payload, response.code);
    });

    request.on('error', callback);

    request.end();
  });
};

Cluster.prototype.rd = function() {
  if (!this.rdIp)
    return;

  return RD({ ip: this.rdIp, port: this.rdPort }, this.coap);
}

Cluster.prototype.fetchIp = function(callback) {
  if (this.ip) {
    callback(null, this.ip);
    return;
  }

  var rd = this.rd();

  if (!rd || !this.uid) {
    callback(new Error('UID lookup requires RD and UID'));
    return;
  }

  var cluster = this;
  rd.lookup({ uid: this.uid }, function(err, resources) {
    if (err) {
      callback(err);
      return;
    }

    var resource = resources[0];
    if (!resource) {
      callback(new Error(`No resources found with uid ${cluster.uid}`));
    }

    cluster.ip = resource.ip;
    callback(null, cluster.ip);
  });
}


Cluster.prototype.get = function(uri, query, callback) {
  this.request('GET', uri, query, null, callback);
};

Cluster.prototype.post = function(uri, payload, callback) {
  this.request('POST', uri, null, payload, callback);
}

Cluster.prototype.delete = function(uri, callback) {
  this.request('DELETE', uri, null, null, callback);
};

ClusterConstructor.class = Cluster;

