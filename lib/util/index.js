module.exports = function() {
  return {
    camelCase: require(__appRoot + 'lib/util/camelCase'),
    pascalCase: require(__appRoot + 'lib/util/pascalCase')
  }
}
