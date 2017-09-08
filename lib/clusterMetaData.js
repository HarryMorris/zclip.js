var fs = require('fs');
var filePath = './clusterMetaData.json';

module.exports = function() {
  return JSON.parse(fs.readFileSync(filePath));
};

