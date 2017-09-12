module.exports = function(target, coap) {
  if (!target.OnOffCluster) {
    console.log('Expected OnOffCluster on', target);
  }

  target.OnOffCluster.prototype.toggle = function() {
    var request = coap.request({
      hostname: this.ip,
      port: this.port || 5683,
      method: 'POST',
      pathname: this.basePath + 's6/c/2'
    });

    request.on('error', (e) => {
      console.error(e);
    });

    request.end();
  }
}
