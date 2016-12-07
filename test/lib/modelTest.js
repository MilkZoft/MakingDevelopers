import '../globalTest';
import {
  countAllRowsFrom,
  deleteRow,
  deleteRows,
  executeQuery,
  existsRow,
  find,
  findAll,
  findByQuery,
  getColumns,
  getProcedure,
  getSchemaFrom,
  getTableSchema,
  insertRow,
  query,
  removeRow,
  removeRows,
  restoreRow,
  restoreRows,
  search,
  updateRow
} from '../../src/lib/model';

describe('@Model', () => {
  describe('#countAllRowsFrom', () => {
    it('should be a function', () => {
      assert.typeOf(countAllRowsFrom, 'function', 'countAllRowsFrom should be a function');
    });
  });

  describe('#deleteRow', () => {
    it('should be a function', () => {
      assert.typeOf(deleteRow, 'function', 'deleteRow should be a function');
    });
  });

  describe('#deleteRows', () => {
    it('should be a function', () => {
      assert.typeOf(deleteRows, 'function', 'deleteRows should be a function');
    });
  });

  describe('#executeQuery', () => {
    it('should be a function', () => {
      assert.typeOf(executeQuery, 'function', 'executeQuery should be a function');
    });
  });

  describe('#existsRow', () => {
    it('should be a function', () => {
      assert.typeOf(existsRow, 'function', 'existsRow should be a function');
    });
  });

  describe('#find', () => {
    it('should be a function', () => {
      assert.typeOf(find, 'function', 'find should be a function');
    });
  });

  describe('#findAll', () => {
    it('should be a function', () => {
      assert.typeOf(findAll, 'function', 'findAll should be a function');
    });
  });

  describe('#findByQuery', () => {
    it('should be a function', () => {
      assert.typeOf(findByQuery, 'function', 'findByQuery should be a function');
    });
  });

  describe('#getColumns', () => {
    it('should be a function', () => {
      assert.typeOf(getColumns, 'function', 'getColumns should be a function');
    });
  });

  describe('#getProcedure', () => {
    it('should be a function', () => {
      assert.typeOf(getProcedure, 'function', 'getProcedure should be a function');
    });
  });

  describe('#getSchemaFrom', () => {
    it('should be a function', () => {
      assert.typeOf(getSchemaFrom, 'function', 'getSchemaFrom should be a function');
    });
  });

  describe('#getTableSchema', () => {
    it('should be a function', () => {
      assert.typeOf(getTableSchema, 'function', 'getTableSchema should be a function');
    });
  });

  describe('#insertRow', () => {
    it('should be a function', () => {
      assert.typeOf(insertRow, 'function', 'insertRow should be a function');
    });
  });

  describe('#query', () => {
    it('should be a function', () => {
      assert.typeOf(query, 'function', 'query should be a function');
    });
  });

  describe('#removeRow', () => {
    it('should be a function', () => {
      assert.typeOf(removeRow, 'function', 'removeRow should be a function');
    });
  });

  describe('#removeRows', () => {
    it('should be a function', () => {
      assert.typeOf(removeRows, 'function', 'removeRows should be a function');
    });
  });

  describe('#restoreRow', () => {
    it('should be a function', () => {
      assert.typeOf(restoreRow, 'function', 'restoreRow should be a function');
    });
  });

  describe('#restoreRows', () => {
    it('should be a function', () => {
      assert.typeOf(restoreRows, 'function', 'restoreRows should be a function');
    });
  });

  describe('#search', () => {
    it('should be a function', () => {
      assert.typeOf(search, 'function', 'search should be a function');
    });
  });

  describe('#updateRow', () => {
    it('should be a function', () => {
      assert.typeOf(updateRow, 'function', 'updateRow should be a function');
    });
  });
});
