var path = require('path');

global.cbor = require('cbor');

global.__appRoot = path.resolve(__dirname + '/../../') + '/';
global.FakeCoap = require(__appRoot + 'test/support/FakeCoap');

require(__appRoot + 'lib/devices').init(__appRoot + 'test/support/deviceMetaData.json');
require(__appRoot + 'lib/clusters').init(__appRoot + 'test/support/clusterMetaData.json');

