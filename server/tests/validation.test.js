const expect = require('expect');

const {isRealString} = require('./../utils/validation.js');

describe('To verify isRealString method', () => {

  it('Should reject values other than strings', () => {
      expect(isRealString(2)).toBe(false);
  });

  it('Should reject strings with only spaces', () => {
      expect(isRealString('    ')).toBe(false);
  });

  it('Should accpet strings with non spaces', () => {
      expect(isRealString('Kranthi Kumar')).toBe(true);
  });
});
