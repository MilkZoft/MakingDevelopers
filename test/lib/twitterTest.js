import '../globalTest';
import {
  api,
  getAuthenticateUrl,
  getOAuthAccessToken,
  getOAuthRequestToken
} from '../../src/lib/twitter';

describe('@Twitter', () => {
  describe('#api', () => {
    it('should be a function', () => {
      assert.typeOf(api, 'function', 'api should be a function');
    });
  });

  describe('#getAuthenticateUrl', () => {
    it('should be a function', () => {
      assert.typeOf(getAuthenticateUrl, 'function', 'getAuthenticateUrl should be a function');
    });
  });

  describe('#getOAuthAccessToken', () => {
    it('should be a function', () => {
      assert.typeOf(getOAuthAccessToken, 'function', 'getOAuthAccessToken should be a function');
    });
  });

  describe('#getOAuthRequestToken', () => {
    it('should be a function', () => {
      assert.typeOf(getOAuthRequestToken, 'function', 'getOAuthRequestToken should be a function');
    });
  });
});
