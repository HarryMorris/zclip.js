var fs = require('fs');
var filePath = __appRoot + 'clusterMetaData.json';

module.exports = function() {
  return JSON.parse(fs.readFileSync(filePath));
};

