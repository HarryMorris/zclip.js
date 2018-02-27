var DEFAULT_MULTICAST_IP = 'ff03::1';
var discoveryPath = '.well-known/core';

var DiscoverResponse = require(__appRoot + 'lib/DiscoverResponse');

module.exports = function(coap) {

  return function(query, callback) {
    var queryString = buildQuery(query);

    var request = coap.request({
      host: DEFAULT_MULTICAST_IP,
      port: 5683,
      method: 'GET',
      pathname: discoveryPath,
      multicast: true,
      multicastTimeout: 3000,
      query: queryString
    });

    request.setOption('Accept', 'application/link-format');

    request.on('response', function(coapResponse) {
      var discoveryResponse = DiscoverResponse(coapResponse);
      callback(null, discoveryResponse.devices);;
    });

    request.on('error', function(e) {
      callback(e.message);
    });

    request.end();
  }

  function validQuery(query) {
    return query && query.cluster && query.side;
  }
}

function buildQuery(query) {
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

