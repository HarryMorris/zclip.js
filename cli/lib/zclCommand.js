var minimist = require('minimist');

module.exports = function(argv) {
  var argv = minimist(argv.slice(2));

  var keywords = argv._;

  var options = {};
  for (var key in argv) {
    if (key !== '_') options[key] = argv[key];
  }

  return {
    keywords: keywords,
    options: options
  }
}

