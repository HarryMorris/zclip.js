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
    expect(target['0x0000'].name).toEqual('Basic');
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
    expect(target['0x0000'].commands['0x01'].name).toEqual('Command 1');
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
    expect(target['0x0000'].commands['0x01'].name).toEqual('Command 1');
    expect(target['0x0000'].commands['0x02'].name).toEqual('Command 2');
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
    expect(target['0x0000'].attributes['0x0001'].name).toEqual('Attribute 1');
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
    expect(target['0x0000'].attributes['0x0001'].name).toEqual('Attribute 1');
    expect(target['0x0000'].attributes['0x0002'].name).toEqual('Attribute 2');
  });
});

