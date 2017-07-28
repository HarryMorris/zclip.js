module.exports = function(coap) {
  function OnOffCluster(attrs) {
    this.ip = attrs.ip;
    this.port = attrs.port;
    this.endpoint = attrs.endpoint;
  }

  OnOffCluster.prototype.toggle = function(callback) {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: `/zcl/e/1/s6/c/2`
    });

    request.on('response', (response) => {
      console.log(`Response: ${response.code} ${response.payload.toString()}`);
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }

  return OnOffCluster;
}

