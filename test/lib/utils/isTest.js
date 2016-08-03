import '../../globalTest';
import {
  isArray,
  isDay,
  isDefined,
  isFunction,
  isJson,
  isNumber,
  isMonth,
  isObject,
  isString,
  isUndefined,
  isYear
} from '../../../src/lib/utils/is';

describe('@Is', () => {
  describe('#isArray', () => {
    it('should be a function', () => {
      assert.typeOf(isArray, 'function', 'isArray should be a function');
    });
  });

  describe('#isDay', () => {
    it('should be a function', () => {
      assert.typeOf(isDay, 'function', 'isDay should be a function');
    });
  });

  describe('#isDefined', () => {
    it('should be a function', () => {
      assert.typeOf(isDefined, 'function', 'isDefined should be a function');
    });

    it('should return true if a variable is defined', () => {
      const test = 'Foo';

      assert.isTrue(
        isDefined(test),
        'test variable should be defined'
      );
    });

    it('should return false if a variable is undefined', () => {
      let test;

      assert.isFalse(
        isDefined(test),
        'test variable should be defined'
      );
    });
  });

  describe('#isFunction', () => {
    it('should be a function', () => {
      assert.typeOf(isFunction, 'function', 'isFunction should be a function');
    });
  });

  describe('#isJson', () => {
    it('should be a function', () => {
      assert.typeOf(isJson, 'function', 'isJson should be a function');
    });
  });

  describe('#isMonth', () => {
    it('should be a function', () => {
      assert.typeOf(isMonth, 'function', 'isMonth should be a function');
    });
  });

  describe('#isNumber', () => {
    it('should be a function', () => {
      assert.typeOf(isNumber, 'function', 'isNumber should be a function');
    });
  });

  describe('#isObject', () => {
    it('should be a function', () => {
      assert.typeOf(isObject, 'function', 'isObject should be a function');
    });

    it('should return true if a variable is object', () => {
      const test = {
        foo: 'Foo'
      };

      assert.isTrue(
        isObject(test),
        'test variable should be an object'
      );
    });
  });

  describe('#isString', () => {
    it('should be a function', () => {
      assert.typeOf(isString, 'function', 'isString should be a function');
    });
  });

  describe('#isUndefined', () => {
    it('should be a function', () => {
      assert.typeOf(isUndefined, 'function', 'isUndefined should be a function');
    });
  });

  describe('#isYear', () => {
    it('should be a function', () => {
      assert.typeOf(isYear, 'function', 'isYear should be a function');
    });
  });
});
