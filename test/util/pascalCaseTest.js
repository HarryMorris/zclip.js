require(__dirname + '/../support/testHelper');

describe('util.pascalCase', () => {
  var pascalCase;

  beforeAll(() => {
    pascalCase = require(__zclipRoot + 'lib/util').pascalCase;
  });

  it('returns empty string if given undefined', () => {
    expect(pascalCase(undefined)).toEqual('');
  });

  it('pascalCases single word', () => {
    expect(pascalCase('Great')).toEqual('Great');
  });

  it('pascalCases multiple capitalized words', () => {
    expect(pascalCase('Great Test')).toEqual('GreatTest');
  });

  it('pascalCases multiple lowercase words', () => {
    expect(pascalCase('great test')).toEqual('GreatTest');
  });

  it('removes symbols', () => {
    expect(pascalCase('great/test')).toEqual('GreatTest');
  });

  it('removes multiple spaces', () => {
    expect(pascalCase('great  test')).toEqual('GreatTest');
  });
});
