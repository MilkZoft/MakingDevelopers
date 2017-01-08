import '../globalTest';
import { Post } from '../../src/lib/post';

const {
  action,
  debug,
  getAllPost,
  isGet,
  isPost,
  post,
  refreshSecurityToken,
  validate,
  validateSecurityToken,
  _getPostsFromArray
} = Post();

describe('@Post', () => {
  describe('#action', () => {
    it('should be a function', () => {
      assert.typeOf(action, 'function', 'action should be a function');
    });
  });

  describe('#debug', () => {
    it('should be a function', () => {
      assert.typeOf(debug, 'function', 'debug should be a function');
    });
  });

  describe('#getAllPost', () => {
    it('should be a function', () => {
      assert.typeOf(getAllPost, 'function', 'getAllPost should be a function');
    });
  });

  describe('#isGet', () => {
    it('should be a function', () => {
      assert.typeOf(isGet, 'function', 'isGet should be a function');
    });
  });

  describe('#isPost', () => {
    it('should be a function', () => {
      assert.typeOf(isPost, 'function', 'isPost should be a function');
    });
  });

  describe('#post', () => {
    it('should be a function', () => {
      assert.typeOf(post, 'function', 'post should be a function');
    });
  });

  describe('#refreshSecurityToken', () => {
    it('should be a function', () => {
      assert.typeOf(refreshSecurityToken, 'function', 'refreshSecurityToken should be a function');
    });
  });

  describe('#validate', () => {
    it('should be a function', () => {
      assert.typeOf(validate, 'function', 'validate should be a function');
    });
  });

  describe('#validateSecurityToken', () => {
    it('should be a function', () => {
      assert.typeOf(validateSecurityToken, 'function', 'validateSecurityToken should be a function');
    });
  });

  describe('#_getPostsFromArray', () => {
    it('should be a function', () => {
      assert.typeOf(_getPostsFromArray, 'function', '_getPostsFromArray should be a function');
    });
  });
});
