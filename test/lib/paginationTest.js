import '../globalTest';
import {
  getPagination,
  getPaginationLimit,
  setPaginationMaxLimit,
  _getCurrentPage,
  _getPageNav,
  _getPageNext,
  _getPagePrevious,
  _pagination
} from '../../src/lib/pagination';

describe('@Pagination', () => {
  describe('#getPagination', () => {
    it('should be a function', () => {
      assert.typeOf(getPagination, 'function', 'getPagination should be a function');
    });
  });

  describe('#getPaginationLimit', () => {
    it('should be a function', () => {
      assert.typeOf(getPaginationLimit, 'function', 'getPaginationLimit should be a function');
    });
  });

  describe('#setPaginationMaxLimit', () => {
    it('should be a function', () => {
      assert.typeOf(setPaginationMaxLimit, 'function', 'setPaginationMaxLimit should be a function');
    });
  });

  describe('#_getCurrentPage', () => {
    it('should be a function', () => {
      assert.typeOf(_getCurrentPage, 'function', '_getCurrentPage should be a function');
    });
  });

  describe('#_getPageNav', () => {
    it('should be a function', () => {
      assert.typeOf(_getPageNav, 'function', '_getPageNav should be a function');
    });
  });

  describe('#_getPageNext', () => {
    it('should be a function', () => {
      assert.typeOf(_getPageNext, 'function', '_getPageNext should be a function');
    });
  });

  describe('#_getPagePrevious', () => {
    it('should be a function', () => {
      assert.typeOf(_getPagePrevious, 'function', '_getPagePrevious should be a function');
    });
  });

  describe('#_pagination', () => {
    it('should be a function', () => {
      assert.typeOf(_pagination, 'function', '_pagination should be a function');
    });
  });
});
