require(__dirname + '/support/testHelper');

test('Loads meta data', () => {
  var clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();

  var levelControlCluster = clusterMetaData['8'];
  expect(levelControlCluster).toBeDefined();
  expect(levelControlCluster.name).toEqual('Level Control');
});
