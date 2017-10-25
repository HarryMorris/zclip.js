require(__dirname + '/../support/testHelper');

describe('util.pascalCase', function() {
  var pascalCase;

  beforeAll(function() {
    pascalCase = require(__appRoot + 'lib/util')().pascalCase;
  });

  it('returns empty string if given undefined', function() {
    expect(pascalCase(undefined)).toEqual('');
  });

  it('pascalCases single word', function() {
    expect(pascalCase('Great')).toEqual('Great');
  });

  it('pascalCases multiple capitalized words', function() {
    expect(pascalCase('Great Test')).toEqual('GreatTest');
  });

  it('pascalCases multiple lowercase words', function() {
    expect(pascalCase('great test')).toEqual('GreatTest');
  });

  it('removes symbols', function() {
    expect(pascalCase('great/test')).toEqual('GreatTest');
  });

  it('removes multiple spaces', function() {
    expect(pascalCase('great  test')).toEqual('GreatTest');
  });
});
