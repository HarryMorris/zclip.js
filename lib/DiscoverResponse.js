var URL = require('url');
var QueryString = require('querystring');

var devices = require(__appRoot + 'lib/devices');
var clusters = require(__appRoot + 'lib/clusters');

module.exports = function(response) {
  return new DiscoverResponse(response);
}

function DiscoverResponse(response) {
  this.devices = [];

  var profileIdRegEx = /ze=urn:zcl:d.([a-fA-F0-9]+)./;

  if (!response.payload) return;

  var results = [];
  var links = response.payload.toString().split(',');

  links.forEach(function(link) {
    var deviceAttrs = parsePath(link);
    if (!deviceAttrs) return;

    deviceAttrs.uid = parseUid(link);

    if (!deviceAttrs.ip)
      deviceAttrs.ip = response.rsinfo.address

    var profileId = parseDeviceId(link);
    results.push(devices.build(profileId, deviceAttrs));
  });

  this.devices = results;
}

function parseUid(link) {
  // Needs a terminator
  var regEx = /ni:\/\/\/sha-256;(.+)/;
  var match = regEx.exec(link);

  if (!match) return;

  return match[1];
}

function parsePath(link) {
  var linkRegEx = /(coap:\/\/\[(.*)\])?\/zcl(\/e\/(\d+)\/([cs]{1})(\d+))?/;
  var linkMatch = linkRegEx.exec(link);

  if (!linkMatch) return {};

  return {
    ip: linkMatch[2],
    endpointId: linkMatch[4],
    clusterSide: linkMatch[5],
    clusterId: linkMatch[6],
    cluster: clusters.findNameById(linkMatch[6])
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

  if (deviceMatch)
    return deviceMatch[1];
}

