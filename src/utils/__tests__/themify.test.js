import { themify } from '../themify';

describe('themify util', () => {
  it('should return a valid css selector with an appropriate setting', () => {
    expect(themify('someField', 'dark')).toStrictEqual('someFieldDark');
    expect(themify('field', 'Dark')).toStrictEqual('fieldDark');
    expect(themify('anotherFieldHere', 'dARK')).toStrictEqual(
      'anotherFieldHereDark',
    );
    expect(themify('a', 'light')).toStrictEqual('aLight');
    expect(themify('aB', 'Light')).toStrictEqual('aBLight');
    expect(themify('aBcD', 'lIGHT')).toStrictEqual('aBcDLight');
  });

  it('should throw when illegal theme is passed', () => {
    const invalidTheme = () => {
      themify('a', 'yellow');
    };

    expect(invalidTheme).toThrowError('Invalid theme');
  });
});
