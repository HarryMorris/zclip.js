module.exports = function() {
  function ClusterBase(metaData, coap) {
    this.meta = metaData;
    this.coap = coap;
  }

  return ClusterBase;
};

