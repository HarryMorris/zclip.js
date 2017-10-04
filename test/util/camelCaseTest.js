require(__dirname + '/../support/testHelper');

describe('util.camelCase', function() {
  var camelCase;

  beforeAll(function() {
    camelCase = require(__appRoot + 'lib/util')().camelCase;
  });

  it('camelCases single word', function() {
    expect(camelCase('Great')).toEqual('great');
  });

  it('camelCases multiple capitalized words', function() {
    expect(camelCase('Great Test')).toEqual('greatTest');
  });

  it('camelCases multiple lowercase words', function() {
    expect(camelCase('great test')).toEqual('greatTest');
  });
});
