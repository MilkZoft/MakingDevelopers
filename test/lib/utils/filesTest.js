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

    it('should return the file extension', () => {
      const testData = 'foo.jpg';
      const expectedResult = 'jpg';
      const actualResult = getFileExtension(testData);

      assert.isTrue(actualResult === expectedResult, 'actualResult should be jpg');
    });
  });

  describe('#getFileFormats', () => {
    it('should be a function', () => {
      assert.typeOf(getFileFormats, 'function', 'getFileFormats should be a function');
    });

    it('should return the file formats', () => {
      const expectedResult = {
        'pdf': 'pdf',
        'docx': 'word',
        'js': 'code',
        'json': 'code',
        'mp4': 'video',
        'rar': 'zip',
        'sql': 'code',
        'zip': 'zip'
      };

      const actualResult = getFileFormats();

      assert.deepEqual(
        actualResult,
        expectedResult,
        'actualResult should match expectedResult'
      );
    });
  });

  describe('#getFileInfo', () => {
    it('should be a function', () => {
      assert.typeOf(getFileInfo, 'function', 'getFileInfo should be a function');
    });

    it('should return an array with the file info', () => {
      const testData = 'test/foo.png';

      const expectedResult = {
        name: 'foo',
        extension: 'png'
      };

      const actualResult = getFileInfo(testData);

      assert.deepEqual(
        actualResult,
        expectedResult,
        'actualResult should match expectedResult'
      );
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

    it('should return the image formats', () => {
      const expectedResult = ['png', 'jpg', 'jpeg', 'gif'];
      const actualResult = getImageFormats();

      assert.deepEqual(
        actualResult,
        expectedResult,
        'actualResult should match expectedResult'
      );
    });
  });

  describe('#glob', () => {
    it('should be a function', () => {
      assert.typeOf(glob, 'function', 'glob should be a function');
    });
  });
});
