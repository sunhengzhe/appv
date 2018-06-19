/* global describe test expect */

const appv = require('../index.js');

describe('appv', () => {
  test('appv should be a object', () => {
    expect(appv).toBeInstanceOf(Object);
  });
});

describe('appv.isValidVersion', () => {
  test('appv.isValidVersion should be methods', () => {
    expect(appv.isValidVersion).toBeInstanceOf(Function);
  });

  test('appv.isValidVersion should works well', () => {
    expect(appv.isValidVersion(1)).toBe(false);
    expect(appv.isValidVersion(true)).toBe(false);
    expect(appv.isValidVersion()).toBe(false);
    expect(appv.isValidVersion('abc')).toBe(false);

    expect(appv.isValidVersion('1')).toBe(true);
    expect(appv.isValidVersion('1.2')).toBe(true);
    expect(appv.isValidVersion('1.2.3')).toBe(true);
  });
});

describe('appv.parseVersion', () => {
  test('parseVersion should be a method', () => {
    expect(appv.parseVersion).toBeInstanceOf(Function);
  });

  test('parseVersion should throw an error when param is not valid', () => {
    expect(() => appv.parseVersion('abc')).toThrowError(Error);
  });

  test('parseVersion should parse x.x.x correct', () => {
    expect(appv.parseVersion('1.2.3')).toEqual({
      major: 1,
      minor: 2,
      patch: 3,
    });
  });

  test('parseVersion should parse x.xx.x correct', () => {
    expect(appv.parseVersion('1.12.4')).toEqual({
      major: 1,
      minor: 12,
      patch: 4,
    });
  });

  test('parseVersion should works well if patch not given', () => {
    expect(appv.parseVersion('1.12')).toEqual({
      major: 1,
      minor: 12,
      patch: 0,
    });
  });

  test('parseVersion should works well if patch and minor not given', () => {
    expect(appv.parseVersion('4')).toEqual({
      major: 4,
      minor: 0,
      patch: 0,
    });
  });
});

describe('appv.compare', () => {
  test('appv.compare should be a method', () => {
    expect(appv.compare).toBeInstanceOf(Function);
  });

  describe('appv.isEq', () => {
    test('appv.isEq should be a method', () => {
      expect(appv.isEq).toBeInstanceOf(Function);
    });

    test('appv.isEq should works well', () => {
      expect(appv.isEq('1.2.3', '1.2.3')).toBe(true);
      expect(appv.isEq('1.12', '1.12.0')).toBe(true);
      expect(appv.isEq('1.2', '1.2')).toBe(true);
      expect(appv.isEq('1', '1.0.0')).toBe(true);

      expect(appv.isEq('1.1.1', '1.1.2')).toBe(false);
      expect(appv.isEq('1.2.1', '1.2')).toBe(false);
      expect(appv.isEq('2.1', '2')).toBe(false);
    });
  });

  describe('appv.isGt', () => {
    test('appv.isGt should be a method', () => {
      expect(appv.isGt).toBeInstanceOf(Function);
    });

    test('appv.isGt should works well', () => {
      expect(appv.isGt('1.2.3', '1.2.2')).toBe(true);
      expect(appv.isGt('1.11.3', '1.2.13')).toBe(true);
      expect(appv.isGt('2.1', '1.21.21')).toBe(true);
      expect(appv.isGt('1', '0.11.12')).toBe(true);

      expect(appv.isGt('1.1.1', '1.1.1')).toBe(false);
      expect(appv.isGt('1.2.1', '1.2.3')).toBe(false);
      expect(appv.isGt('2.1', '2.2')).toBe(false);
    });
  });

  describe('appv.isGte', () => {
    test('appv.isGte should be a method', () => {
      expect(appv.isGt).toBeInstanceOf(Function);
    });

    test('appv.isGte should works well', () => {
      expect(appv.isGte('1.2.3', '1.2.3')).toBe(true);
      expect(appv.isGte('1.2.3', '1.1.13')).toBe(true);
      expect(appv.isGte('2.1', '1.21.21')).toBe(true);
      expect(appv.isGte('1', '0.11.12')).toBe(true);

      expect(appv.isGte('1.1.0', '1.1.1')).toBe(false);
      expect(appv.isGte('1.2.1', '1.2.3')).toBe(false);
      expect(appv.isGte('2.1', '2.2')).toBe(false);
    });
  });

  describe('appv.isLt', () => {
    test('appv.isLt should be a method', () => {
      expect(appv.isLt).toBeInstanceOf(Function);
    });

    test('appv.isLt should works well', () => {
      expect(appv.isLt('1.2.2', '1.2.3')).toBe(true);
      expect(appv.isLt('1.1.14', '1.2.1')).toBe(true);
      expect(appv.isLt('1.21.21', '2.1')).toBe(true);
      expect(appv.isLt('0.11.12', '1')).toBe(true);

      expect(appv.isLt('1.1.1', '1.1.1')).toBe(false);
      expect(appv.isLt('1.2.3', '1.2.1')).toBe(false);
      expect(appv.isLt('2.2', '2.1')).toBe(false);
    });
  });

  describe('appv.isLte', () => {
    test('appv.isLte should be a method', () => {
      expect(appv.isLte).toBeInstanceOf(Function);
    });

    test('appv.isLte should works well', () => {
      expect(appv.isLte('1.2.3', '1.2.3')).toBe(true);
      expect(appv.isLte('1.2.13', '1.11.3')).toBe(true);
      expect(appv.isLte('1.21.21', '2.1')).toBe(true);
      expect(appv.isLte('0.11.12', '1')).toBe(true);

      expect(appv.isLte('1.1.1', '1.1.0')).toBe(false);
      expect(appv.isLte('1.2.3', '1.2.1')).toBe(false);
      expect(appv.isLte('2.2', '2.1')).toBe(false);
    });
  });
});

describe('appv.isBetween', () => {
  test('appv.isBetween should be a method', () => {
    expect(appv.isBetween).toBeInstanceOf(Function);
  });

  test('appv.isBetween should works well', () => {
    expect(appv.isBetween('1.2.3', ['1', '2'])).toBe(true);
    expect(appv.isBetween('1.2.13', ['1.2.13', '1.2.14'])).toBe(true);
    expect(appv.isBetween('1.21.21', ['1', '1.21.21'])).toBe(true);

    expect(appv.isBetween('1.2.3', [])).toBe(false);
    expect(appv.isBetween('1.2.13', ['1.11.3', '1.11.4'])).toBe(false);
    expect(appv.isBetween('1.21.21', ['2.1'])).toBe(false);
  });
});

describe('appv.compute', () => {
  test('patch, minor and major should be methods', () => {
    expect(appv.major).toBeInstanceOf(Function);
    expect(appv.minor).toBeInstanceOf(Function);
    expect(appv.patch).toBeInstanceOf(Function);
  });

  test('appv.patch should works well', () => {
    expect(appv.patch('0.0.1')).toBe('0.0.2');
    expect(appv.patch('1.2.3')).toBe('1.2.4');
  });

  test('appv.minor should works well', () => {
    expect(appv.minor('0.0.1')).toBe('0.1.0');
    expect(appv.minor('1.2.3')).toBe('1.3.0');
  });

  test('appv.major should works well', () => {
    expect(appv.major('0.0.1')).toBe('1.0.0');
    expect(appv.major('1.2.3')).toBe('2.0.0');
  });
});
