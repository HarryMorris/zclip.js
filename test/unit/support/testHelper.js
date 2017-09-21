var path = require('path');

global.__appRoot = path.resolve(__dirname + '/../../../') + '/';
global.FakeCoap = require(__appRoot + 'test/unit/support/FakeCoap');

