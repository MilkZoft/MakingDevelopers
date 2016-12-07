import '../globalTest';
import { Templates } from '../../src/lib/templates';

const { defaultScope, get, set } = Templates();

describe('@Templates', () => {
  describe('#defaultScope', () => {
    it('should be a function', () => {
      assert.typeOf(defaultScope, 'function', 'defaultScope should be a function');
    });
  });

  describe('#get', () => {
    it('should be a function', () => {
      assert.typeOf(get, 'function', 'get should be a function');
    });
  });

  describe('#set', () => {
    it('should be a function', () => {
      assert.typeOf(set, 'function', 'set should be a function');
    });
  });
});
