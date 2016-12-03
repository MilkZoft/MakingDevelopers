import '../../globalTest';
import {
  clean,
  escapeString,
  removeHTML
} from '../../../src/lib/utils/string';

describe('@String', () => {
  describe('#clean', () => {
    it('should be a function', () => {
      assert.typeOf(clean, 'function', 'clean should be a function');
    });

    it('should clean a string', () => {
      const str = '<p>Foo</p>';
      const expectedResult = 'Foo';

      assert.isTrue(
        clean(str) === expectedResult,
        'the string should be cleaned'
      );
    });

    it('should return false when the string is undefined', () => {
      let str;

      assert.isFalse(
        clean(str),
        'should return false'
      );
    });
  });

  describe('#escapeString', () => {
    it('should be a function', () => {
      assert.typeOf(escapeString, 'function', 'escape should be a function');
    });
  });

  describe('#removeHTML', () => {
    it('should be a function', () => {
      assert.typeOf(removeHTML, 'function', 'removeHTML should be a function');
    });
  });
});
