var camelCase = require(__appRoot + 'lib/util/camelCase');

module.exports = function(str) {
  if (!str) return '';

  str = camelCase(str);

  str = str.replace(/^(.)/, function($1) { return $1.toUpperCase(); })

  return str;
}
