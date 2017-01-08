import '../globalTest';
import { User } from '../../src/lib/user';

const {
  profileAllowed
} = User();

describe('@User', () => {
  describe('#profileAllowed', () => {
    it('should be a function', () => {
      assert.typeOf(profileAllowed, 'function', 'profileAllowed should be a function');
    });
  });
});
