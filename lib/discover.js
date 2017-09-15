var allThreadNodes = "ff33:40:fd01::1";
var discoveryPath = '.well-known/core';

module.exports = function(coap, zclip) {
  return function(query, callback) {
    if (!validQuery(query)) {
      callback('Invalid query. Expecting cluster and side.');
    }

    var Cluster = query.cluster;
    var clusterId = parseInt(Cluster.prototype.meta.code);
    var side = query.side;

    var request = coap.request({
      host: allThreadNodes,
      port: 5683,
      method: 'GET',
      pathname: discoveryPath,
      multicast: true,
      multicastTimeout: 3000,
      query: 'rt=urn:zcl:c.' + clusterId + '.' + side
    });

    request.on('response', function(response) {
      var discoveryResponse = new DiscoveryResponse(response);

      if (discoveryResponse.valid && discoveryResponse.clusterId == clusterId) {

        var cluster = new Cluster({
          ip: discoveryResponse.ip,
          endpoint: discoveryResponse.endpoint
        });

        callback(null, cluster);
      }
    });

    request.on('error', function(e) {
      console.error(e);
    });

    request.end();
  }

  function validQuery(query) {
    return query && query.cluster && query.side;
  }
}

function DiscoveryResponse(response) {
  if (!response || !response.payload) {
    return;
  }

  var payload = response.payload.toString();

  var clusterPathRegEx = /^<\/zcl\/e\/(\d+)\/([cs])(\d+)>/;
  var match = clusterPathRegEx.exec(payload);

  if (match) {
    this.valid = true;
    this.ip = response.rsinfo.address;
    this.endpoint = match[1];
    this.side = match[2];
    this.clusterId = match[3];
  }
}

