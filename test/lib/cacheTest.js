import '../globalTest';
import { Cache } from '../../src/lib/cache';

const { exists, get, remove, set } = Cache();

describe('@Cache', () => {
  describe('#exists', () => {
    it('should be a function', () => {
      assert.typeOf(exists, 'function', 'exists should be a function');
    });
  });

  describe('#get', () => {
    it('should be a function', () => {
      assert.typeOf(get, 'function', 'get should be a function');
    });
  });

  describe('#remove', () => {
    it('should be a function', () => {
      assert.typeOf(remove, 'function', 'remove should be a function');
    });
  });

  describe('#set', () => {
    it('should be a function', () => {
      assert.typeOf(set, 'function', 'set should be a function');
    });
  });
});
