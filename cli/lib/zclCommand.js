var minimist = require('minimist');
var _ = require('lodash');

module.exports = function(argv) {
  var argv = minimist(argv.slice(2));

  var keywords = argv._;

  var optionKeys = _.reject(_.keys(argv), function(f) {
    return f === '_';
  });

  var options = _.pick(argv, optionKeys);

  return {
    keywords: keywords,
    options: options
  }
}

