var URL = require('url');
var QueryString = require('querystring');

module.exports = function(zclip) {
  var profileIdRegEx = /ze=urn:zcl:d.([a-fA-F0-9]+)./;

  return function(coapResponse) {
    this.devices = [];
    if (!coapResponse.payload) return;

    var results = [];
    var links = coapResponse.payload.toString().split(',');

    links.forEach(function(link) {
      var deviceAttrs = parsePath(link);
      if (!deviceAttrs) return;

      deviceAttrs.uid = parseUid(link);

      if (!deviceAttrs.ip)
        deviceAttrs.ip = coapResponse.rsinfo.address

      var profileId = parseDeviceId(link);

      if (!profileId) return;

      results.push(zclip.devices.build(profileId, deviceAttrs));
    });

    this.devices = results;
  }

  function parseUid(url) {
    var parsedUrl = URL.parse(url);
    var query = QueryString.parse(parsedUrl.query);
    var uidRegEx = /ni:\/\/\/sha-256;(.+)/;

    uidMatch = uidRegEx.exec(query.ep);

    if (uidMatch)
      return uidMatch[1];
  }

  function parsePath(link) {
    var linkRegEx = /(coap:\/\/\[(.*)\])?\/zcl\/e\/(\d+)\/([cs]{1})(\d+)/;
    var linkMatch = linkRegEx.exec(link);

    if (!linkMatch) return;

    return {
      ip: linkMatch[2],
      endpointId: linkMatch[3],
      clusterSide: linkMatch[4],
      clusterId: linkMatch[5],
      cluster: zclip.clusters.findNameById(linkMatch[5])
    };
  }

  function parseVersion(attr) {
    var versionRegEx = /urn:zcl:c.v(\d+)/;
    var versionMatch = versionRegEx.exec(attr);

    return versionMatch[1];
  }

  function parseDeviceId(link) {
    var deviceRegEx = /urn:zcl:d.(\d+).\d+/;
    var deviceMatch = deviceRegEx.exec(link);

    return deviceMatch[1];
  }
}

