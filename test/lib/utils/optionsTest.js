import '../../globalTest';
import {
  getContentInsertOptionsHTML,
  getHiddenOptions,
  getInputOptions,
  getLabelOptions,
  getSelectOptions,
  getSubmitOptions,
  getTextareaOptions
} from '../../../src/lib/utils/options';

describe('@Options', () => {
  describe('#getContentInsertOptionsHTML', () => {
    it('should be a function', () => {
      assert.typeOf(getContentInsertOptionsHTML, 'function', 'getContentInsertOptionsHTML should be a function');
    });
  });

  describe('#getHiddenOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getHiddenOptions, 'function', 'getHiddenOptions should be a function');
    });
  });

  describe('#getInputOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getInputOptions, 'function', 'getInputOptions should be a function');
    });
  });

  describe('#getLabelOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getLabelOptions, 'function', 'getLabelOptions should be a function');
    });
  });

  describe('#getSelectOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getSelectOptions, 'function', 'getSelectOptions should be a function');
    });
  });

  describe('#getSubmitOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getSubmitOptions, 'function', 'getSubmitOptions should be a function');
    });
  });

  describe('#getTextareaOptions', () => {
    it('should be a function', () => {
      assert.typeOf(getTextareaOptions, 'function', 'getTextareaOptions should be a function');
    });
  });
});
