var DiscoverResponse = require(__zclipRoot + 'lib/DiscoverResponse');

module.exports = function(attrs, coap) {
  return new RD(attrs, coap);
}

function RD(attrs, coap) {
  this.ip = attrs.ip;
  this.port = attrs.port || 5683;
  this.coap = coap;
}

RD.prototype.lookup = function(query, callback) {
  var lookupPath = 'rd-lookup/res';
  var queryString = buildQueryString(query);

  var request = this.coap.request({
    hostname: this.ip,
    port: this.port,
    method: 'GET',
    pathname: lookupPath,
    query: queryString
  });

  request.setOption('Accept', 'application/link-format');

  request.on('response', function(coapResponse) {
    var discoveryResponse = new DiscoverResponse(coapResponse);
    callback(null, discoveryResponse.devices);;
  });

  request.on('error', function(e) {
    callback(e.message);
  });

  request.end();
}

function buildQueryString(query) {
  if (query.uid) {
    return 'ep=ni:///sha-256;' + query.uid;
  } else if (query.clusterId && query.clusterSide) {
    return 'rt=urn:zcl:c.' + query.clusterId + '.' + query.clusterSide;
  } else if (query.clusterId) {
    return 'rt=urn:zcl:c.' + query.clusterId + '.*';
  } else {
    return 'rt=urn:zcl:c.*';
  }
}

