require(__dirname + '/support/testHelper');

var importSilabsMetaData = require(__appRoot + 'util/lib/importSilabsMetaData');

test('can import an empty cluster', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Basic</name>\
        <code>0x0000</code>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target[0].name).toEqual('Basic');
    expect(target[0].code).toEqual('0x0000');
    expect(target[0].clusterId).toEqual('0');
  });
});

test('uses hex as key', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Basic</name>\
        <code>0x0300</code>\
      </cluster>\
      <cluster>\
        <name>Basic 2</name>\
        <code>0x00FF</code>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target[300].name).toEqual('Basic');
    expect(target['FF'].name).toEqual('Basic 2');
  });
});

test('removes special characters in cluster name', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Basic/Name</name>\
        <code>0x0000</code>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target[0].name).toEqual('Basic Name');
  });
});

test('titlize cluster name', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>basic name</name>\
        <code>0x0000</code>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target['0'].name).toEqual('Basic Name');
  });
});

test('can import a single command', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Cluster Name</name>\
        <code>0x0000</code>\
        <command code="0x01" name="Command 1"></command>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    var command = target['0'].commands['1'];
    expect(command.name).toEqual('Command 1');
    expect(command.args).toEqual({});
  });
});

test('can import multiple commands', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Cluster Name</name>\
        <code>0x0000</code>\
        <command code="0x01" name="Command 1"></command>\
        <command code="0x02" name="Command 2"></command>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target['0'].commands['1'].name).toEqual('Command 1');
    expect(target['0'].commands['2'].name).toEqual('Command 2');
  });
});

test('can import commands with arguments', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Cluster Name</name>\
        <code>0x0000</code>\
        <command code="0x01" name="Command 1">\
          <arg name="arg1" />\
          <arg name="arg2" />\
        </command>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    var command = target['0'].commands['1'];
    expect(command.name).toEqual('Command 1');
    expect(command.args['0'].name).toEqual('arg1');
    expect(command.args['1'].name).toEqual('arg2');
  });
});


test('can import a single attribute', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Cluster Name</name>\
        <code>0x0000</code>\
        <attribute code="0x0001" type="INT16U" min="0x00">Attribute 1</attribute>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target['0'].attributes['1'].name).toEqual('Attribute 1');
  });
});

test('can import multiple attributes', () => {
  var xml = '\
    <configurator>\
      <cluster>\
        <name>Cluster Name</name>\
        <code>0x0000</code>\
        <attribute code="0x0001" type="INT16U" min="0x00">Attribute 1</attribute>\
        <attribute code="0x0002" type="INT16U" min="0x00">Attribute 2</attribute>\
      </cluster>\
    </configurator>\
  ';

  var target = {};

  importSilabsMetaData(xml, target, function(err) {
    expect(target['0'].attributes['1'].name).toEqual('Attribute 1');
    expect(target['0'].attributes['2'].name).toEqual('Attribute 2');
  });
});

