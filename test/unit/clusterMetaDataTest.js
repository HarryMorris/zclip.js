require(__dirname + '/support/testHelper');

test('Loads meta data', () => {
  var clusterMetaData = require(__appRoot + 'lib/clusterMetaData')();

  var levelControlCluster = clusterMetaData['0x0008'];
  expect(levelControlCluster).toBeDefined();
  expect(levelControlCluster.name).toEqual('Level Control');
});
