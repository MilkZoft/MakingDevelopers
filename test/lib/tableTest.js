import '../globalTest';
import {
  createTable,
  _getTBody,
  _getTHead
} from '../../src/lib/table';

describe('@Table', () => {
  describe('#createTable', () => {
    it('should be a function', () => {
      assert.typeOf(createTable, 'function', 'createTable should be a function');
    });
  });

  describe('#_getTBody', () => {
    it('should be a function', () => {
      assert.typeOf(_getTBody, 'function', '_getTBody should be a function');
    });
  });

  describe('#_getTHead', () => {
    it('should be a function', () => {
      assert.typeOf(_getTHead, 'function', '_getTHead should be a function');
    });
  });
});
