var path = require('path');

global.cbor = require('cbor');

global.__appRoot = path.resolve(__dirname + '/../../') + '/';
global.FakeCoap = require(__appRoot + 'test/support/FakeCoap');

