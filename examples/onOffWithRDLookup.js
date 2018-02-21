/*
 * This example assumes a ZCLIP Resource Directory (rd)
 * is listening at the specified location and an OnOff cluster  identified
 * by the uid is registered.
 *
 * The cluster will first query the Resource Directory for it's devices's IP,
 * and then send an On command to that IP.
 *
 * The zclip-rd project provides such a Resource Directory.
 */

var coap = require('coap');
var zcl = require('../.')(coap);

var resourceDirectoryIp = '2001::1'
var resourceDirectoryPort = 5683;
var deviceUid = 'P7BU0eh27b2f5f0IC0GLL7uHum';
var clusterEndpoint = 1;

var onOff = zcl.clusters.OnOff({
  uid: deviceUid,
  endpoint: clusterEndpoint,
  rdIp: resourceDirectoryIp,
  rdPort: resourceDirectoryPort
});

onOff.on({}, (err, response) => {
  if (err)
    console.error(err);

  console.log(response.code);
});

