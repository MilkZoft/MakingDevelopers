import '../globalTest';
import { getMedia } from '../../src/lib/media';

describe('@Media', () => {
  describe('#getMedia', () => {
    it('should be a function', () => {
      assert.typeOf(getMedia, 'function', 'getMedia should be a function');
    });
  });
});
