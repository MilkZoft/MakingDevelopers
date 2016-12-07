import '../../globalTest';
import {
  getFileExtension,
  getFileFormats,
  getFileInfo,
  getFileSize,
  getImageFormats,
  glob
} from '../../../src/lib/utils/files';

describe('@Files', () => {
  describe('#getFileExtension', () => {
    it('should be a function', () => {
      assert.typeOf(getFileExtension, 'function', 'getFileExtension should be a function');
    });
  });

  describe('#getFileFormats', () => {
    it('should be a function', () => {
      assert.typeOf(getFileFormats, 'function', 'getFileFormats should be a function');
    });
  });

  describe('#getFileInfo', () => {
    it('should be a function', () => {
      assert.typeOf(getFileInfo, 'function', 'getFileInfo should be a function');
    });
  });

  describe('#getFileSize', () => {
    it('should be a function', () => {
      assert.typeOf(getFileSize, 'function', 'getFileSize should be a function');
    });
  });

  describe('#getImageFormats', () => {
    it('should be a function', () => {
      assert.typeOf(getImageFormats, 'function', 'getImageFormats should be a function');
    });
  });

  describe('#glob', () => {
    it('should be a function', () => {
      assert.typeOf(glob, 'function', 'glob should be a function');
    });
  });
});
