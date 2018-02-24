module.exports = function(meta) {
  return new AttributeCollection(meta);
}

function AttributeCollection(meta) {
  this.meta = meta;
}

AttributeCollection.prototype.decode = function(encodedAttrs) {
  if (!encodedAttrs) return {};

  var decodedAttrs = {};

  encodedAttrs.forEach((val, key) => {
    var attr = this.meta[key.toString()];
    if (attr) decodedAttrs[attr.name] = val.v;
  });

  return decodedAttrs;
}
