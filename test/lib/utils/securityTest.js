import '../../globalTest';
import {
  encrypt,
  md5,
  sha1
} from '../../../src/lib/utils/security';

describe('@Security', () => {
  describe('#encrypt', () => {
    it('should be a function', () => {
      assert.typeOf(encrypt, 'function', 'encrypt should be a function');
    });

    it('should return a encrypted salted string', () => {
      const expectedResult = '46ca42396183e65569beb1d62c36afb171d1d300';
      const actualResult = encrypt('foo');

      assert.isTrue(actualResult === expectedResult, 'should be a hash');
    });
  });

  describe('#md5', () => {
    it('should be a function', () => {
      assert.typeOf(md5, 'function', 'md5 should be a function');
    });
  });

  describe('#sha1', () => {
    it('should be a function', () => {
      assert.typeOf(sha1, 'function', 'sha1 should be a function');
    });
  });
});
