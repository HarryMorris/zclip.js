require(__dirname + '/../support/testHelper');

describe('util.camelCase', () => {
  var camelCase;

  beforeAll(() => {
    camelCase = require(__zclipRoot + 'lib/util').camelCase;
  });

  it('returns empty string if given undefined', () => {
    expect(camelCase(undefined)).toEqual('');
  });

  it('camelCases single word', () => {
    expect(camelCase('Great')).toEqual('great');
  });

  it('camelCases multiple capitalized words', () => {
    expect(camelCase('Great Test')).toEqual('greatTest');
  });

  it('camelCases multiple lowercase words', () => {
    expect(camelCase('great test')).toEqual('greatTest');
  });

  it('removes symbols', () => {
    expect(camelCase('great/test')).toEqual('greatTest');
  });

  it('removes multiple spaces', () => {
    expect(camelCase('great  test')).toEqual('greatTest');
  });

  it('handles all caps', () => {
    expect(camelCase('GREAT TEST')).toEqual('greatTest');
  });

  it('handles already camel cased test', () => {
    expect(camelCase('greatTest')).toEqual('greatTest');
  });
});
