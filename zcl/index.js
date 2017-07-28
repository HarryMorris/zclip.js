module.exports = function(coap) {
  return {
    LevelControlCluster: require('./clusters/LevelControlCluster')(coap),
    OnOffCluster: require('./clusters/OnOffCluster')(coap)
  }
}

