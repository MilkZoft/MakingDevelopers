import '../globalTest';
import {
  availableLanguages,
  defaultLanguage,
  getCurrentLanguage,
  getLanguagePath,
  isLanguage,
  loadLanguage
} from '../../src/lib/i18n';

describe('@i18n', () => {
  describe('#availableLanguages', () => {
    it('should be a function', () => {
      assert.typeOf(availableLanguages, 'function', 'availableLanguages should be a function');
    });
  });

  describe('#defaultLanguage', () => {
    it('should be a function', () => {
      assert.typeOf(defaultLanguage, 'function', 'defaultLanguage should be a function');
    });
  });

  describe('#getCurrentLanguage', () => {
    it('should be a function', () => {
      assert.typeOf(getCurrentLanguage, 'function', 'getCurrentLanguage should be a function');
    });
  });

  describe('#getLanguagePath', () => {
    it('should be a function', () => {
      assert.typeOf(getLanguagePath, 'function', 'getLanguagePath should be a function');
    });
  });

  describe('#isLanguage', () => {
    it('should be a function', () => {
      assert.typeOf(isLanguage, 'function', 'isLanguage should be a function');
    });
  });

  describe('#loadLanguage', () => {
    it('should be a function', () => {
      assert.typeOf(loadLanguage, 'function', 'loadLanguage should be a function');
    });
  });
});
