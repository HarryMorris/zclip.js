var path = require('path');

global.cbor = require('cbor');

global.__zclipRoot = path.resolve(__dirname + '/../../') + '/';
global.FakeCoap = require(__zclipRoot + 'test/support/FakeCoap');

require(__zclipRoot + 'lib/devices').init(__zclipRoot + 'test/support/deviceMetaData.json');
require(__zclipRoot + 'lib/clusters').init(__zclipRoot + 'test/support/clusterMetaData.json');

