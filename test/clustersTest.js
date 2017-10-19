require(__dirname + '/support/testHelper');

var clusterMetaData = {
  "6": {
    "name": "onOff",
    "code": "0x0006",
    "clusterId": "6",
    "commands": {
      "0": {
        "name": "off",
        "args": {}
      },
      "1": {
        "name": "on",
        "args": {}
      }
    },
    "attributes": {
      "0": {
        "name": "onOff",
        "side": "server",
        "datatype": "boolean",
        "min": "0x00",
        "max": "0x01"
      }
    }
  }
}


test('returns clusters from meta data', () => {
  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  expect(clusters.OnOff).toBeDefined();
});

test('adds metadata to cluster instances', () => {

  var clusters = require(__appRoot + 'lib/clusters')(clusterMetaData);

  var onOff = new clusters.OnOff();

  expect(onOff.meta).toBeDefined();
  expect(onOff.meta.code).toEqual('0x0006');
  expect(onOff.meta.clusterId).toEqual('6');
});

