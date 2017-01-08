// Dependencies
import mysql from 'mysql';

// Configuration
import { $db } from '../config';

// Utils
import { addSlashes } from '../utils/string';
import { isArray, isObject } from '../utils/is';
import { forEach, keys } from '../utils/object';

// Database connection
const connection = mysql.createConnection({
  database: $db().mysql.database,
  host: $db().mysql.host,
  password: $db().mysql.password,
  port: $db().mysql.port,
  user: $db().mysql.user
});

export function getExistsQuery(table, data) {
  if (table && data) {
    const query = `SELECT * FROM ${table} WHERE ${buildWhereQuery(data)}`;

    return query;
  }

  return false;
}

export function buildWhereQuery(data) {
  const count = keys(data).length - 1;
  let i = 0;
  let query = '';

  forEach(data, field => {
    if (i === count) {
      query += `${field} = '${data[field]}'`;
    } else {
      query += `${field} = '${data[field]}' AND `;
    }

    i++;
  });

  return query;
}

export function getSearchQuery(data) {
  const count = data.searchBy.length - 1;
  let where = 'WHERE (';
  let i = 0;

  forEach(data.searchBy, field => {
    if (i === count) {
      where += `${field} LIKE '%${data.searchTerm}%'`;
    } else {
      where += `${field} LIKE '%${data.searchTerm}%' OR `;
    }

    i++;
  });

  where += ')';

  const query = `
    SELECT ${data.fields || '*'}
      FROM ${data.table}
      ${where}
      ORDER BY id DESC
    `;

  return query;
}

export function getCountAllRowsQuery(table) {
  const query = `SELECT COUNT(1) AS Total FROM ${table}`;

  return query;
}

export function getUpdateQuery(table, data, id) {
  if (isObject(data)) {
    const count = keys(data).length - 1;
    let values = '';
    let i = 0;

    forEach(data, f => {
      if (i === count) {
        values += `${f} = '${addSlashes(data[f])}'`;
      } else {
        values += `${f} = '${addSlashes(data[f])}', `;
      }

      i++;
    });

    if (id > 0) {
      const query = `UPDATE ${table} SET ${values} WHERE id = ${id}`;

      return query;
    }
  }

  return false;
}

export function getInsertQuery(table, data) {
  if (isObject(data)) {
    const count = keys(data).length - 1;
    let fields = '';
    let values = '';
    let i = 0;

    forEach(data, f => {
      if (i === count) {
        fields += f;
        values += `'${addSlashes(data[f])}'`;
      } else {
        fields += `${f}, `;
        values += `'${addSlashes(data[f])}', `;
      }

      i++;
    });

    const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;

    return query;
  }

  return false;
}

export function getDeleteQuery(table, id) {
  const query = `UPDATE ${table} SET state = 'Deleted' WHERE id = ${id}`;

  return query;
}

export function getRemoveQuery(table, id) {
  const query = `DELETE FROM ${table} WHERE id = ${id}`;

  return query;
}

export function getRestoreQuery(table, state, id) {
  const query = `UPDATE ${table} SET state = '${state}' WHERE id = ${id}`;

  return query;
}

export function getDeleteRowsQuery(table, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `UPDATE ${table} SET state = 'Deleted' WHERE id IN (${ids})`;

  return query;
}

export function getRemoveRowsQuery(table, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `DELETE FROM ${table} WHERE id IN (${ids})`;

  return query;
}

export function getRestoreRowsQuery(table, state, rows) {
  const ids = isArray(rows) ? rows.join(', ') : rows;
  const query = `UPDATE ${table} SET state = '${state}' WHERE id IN (${ids})`;

  return query;
}

/**
 * Builds the SQL Query
 *
 * @param {object} obj Query Object
 * @param {string} find Defines if want to find by "first" or "last"
 * @returns {string} SQL Query
 */
export function getQuery(obj, find) {
  const getFields = () => obj.fields || '*';
  const getTable = () => obj.table;
  const getGroup = () => obj.group && `GROUP BY ${obj.group}` || '';
  const getOrder = () => obj.order && `ORDER BY ${obj.order}` || '';
  const getLimit = () => obj.limit && `LIMIT ${obj.limit}` || '';

  let limit = getLimit();
  let order = getOrder();
  let where = '';

  // Find by id
  if (obj.id) {
    where = `WHERE id = ${obj.id}`;
  }

  // Find by field
  if (obj.field && obj.value) {
    where = `WHERE ${obj.field} = '${obj.value}'`;
  }

  // Find by SQL
  if (isObject(obj.query)) {
    where = `WHERE ${buildWhereQuery(obj.query)}`;
  } else if (obj.query) {
    where = `WHERE ${obj.query}`;
  }

  // Find first
  if (find) {
    limit = 'LIMIT 1';
  }

  if (find === 'last') {
    order = `ORDER BY ${obj.key} DESC `;
  }

  const query = `SELECT ${getFields()} FROM ${getTable()} ${where} ${getGroup()} ${order} ${limit}`;

  return query;
}

/**
 * Find a row by id
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function find(obj, callback) {
  if (!obj.id) {
    return false;
  }

  return connection.query(getQuery(obj), callback);
}

/**
 * Find All Rows
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function findAll(obj, callback) {
  const sql = getQuery(obj);
  return connection.query(sql, callback);
}

/**
 * Find a row by field
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function findBy(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

/**
 * Find a row by SQL Query
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function findByQuery(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

/**
 * Find first row
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function findFirst(obj, callback) {
  return connection.query(getQuery(obj, 'first'), callback);
}

/**
 * Find last row
 *
 * @param {object} obj Query Object
 * @param {function} callback Callback
 * @returns {string} SQL Query
 */
export function findLast(obj, callback) {
  if (!obj.key) {
    return false;
  }

  return connection.query(getQuery(obj, 'last'), callback);
}

/**
 * Executes a query
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @returns {object} SQL Object
 */
export function query(sql, callback) {
  return sql
    ? connection.query(sql, callback)
    : false;
}
