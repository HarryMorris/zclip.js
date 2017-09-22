var allThreadNodes = "ff33:40:fd01::1";
var discoveryPath = '.well-known/core';

module.exports = function(coap) {
  return function(query, callback) {
    var queryString = buildQuery(query);

    var request = coap.request({
      host: allThreadNodes,
      port: 5683,
      method: 'GET',
      pathname: discoveryPath,
      multicast: true,
      multicastTimeout: 3000,
      query: queryString
    });

    request.on('response', function(response) {
      callback(null, response.rsinfo.address);
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
  if (query.cluster) {
    var Cluster = query.cluster;
    var clusterId = Cluster.prototype.meta.clusterId;
    var side = query.side;
    return 'rt=urn:zcl:c.' + clusterId + '.' + side;
  } else {
    return 'rt=urn:zcl:c.*';
  }
}

