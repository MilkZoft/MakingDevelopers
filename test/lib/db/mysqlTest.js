import '../../globalTest';

import { getExistsQuery, getInsertQuery, getQuery } from '../../../src/lib/db/mysql';

describe('@MySQL', () => {
  describe('#getExistsQuery', () => {
    it('should be a function', () => {
      assert.typeOf(getExistsQuery, 'function', 'day should be a function');
    });

    it('should return a SQL query to see if a row exists', () => {
      const table = 'test';
      const data = {
        bar: 'bar',
        foo: 'foo'
      };
      const expectedResult = `SELECT * FROM ${table} WHERE bar = 'bar' AND foo = 'foo'`;
      const actualResult = getExistsQuery(table, data);

      assert.isTrue(
        actualResult === expectedResult,
        'actualResult should match expectedResult'
      );
    });
  });

  describe('#getInsertQuery', () => {
    it('should be a function', () => {
      assert.typeOf(getInsertQuery, 'function', 'day should be a function');
    });

    it('should return a SQL query to insert a new row', () => {
      const table = 'test';
      const data = {
        bar: 'bar',
        foo: 'foo'
      };
      const expectedResult = `INSERT INTO ${table} (bar, foo) VALUES ('bar', 'foo')`;
      const actualResult = getInsertQuery(table, data);

      assert.isTrue(
        actualResult === expectedResult,
        'actualResult should match expectedResult'
      );
    });
  });

  describe('#getQuery', () => {
    it('should be a function', () => {
      assert.typeOf(getQuery, 'function', 'day should be a function');
    });

    it('should return a SQL query from data object', () => {
      const data = {
        table: 'test',
        field: 'foo',
        value: 'foo',
        group: 'foo',
        order: 'id',
        limit: '5'
      };
      const sql = `SELECT * FROM ${data.table} WHERE ${data.field} = '${data.value}' GROUP BY foo ORDER BY id LIMIT 5`;
      const actualResult = getQuery(data);

      assert.isTrue(
        actualResult === sql,
        'actualResult should match expectedResult'
      );
    });
  });
});
