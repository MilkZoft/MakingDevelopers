// Dependencies
import mysql from 'mysql';

// Configuration
import { $db } from '../config';

// Utils
import { addSlashes } from '../utils/string';
import { isObject } from '../utils/is';
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
    const count = keys(data).length - 1;
    let i = 0;
    let query = `SELECT * FROM ${table} WHERE `;

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
  const query = `UPDATE ${table} SET state = 'deleted' WHERE id = ${id}`;

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
  if (obj.key && obj.id) {
    where = `WHERE ${obj.key} = ${obj.id}`;
  }

  // Find by field
  if (obj.field && obj.value) {
    where = `WHERE ${obj.field} = '${obj.value}'`;
  }

  // Find by SQL
  if (obj.query) {
    where = `WHERE ${obj.query}`;
  }

  // Find first
  if (find) {
    limit = 'LIMIT 1';
  }

  if (find === 'last') {
    order = `ORDER BY ${obj.key} DESC `;
  }

  return `SELECT ${getFields()} FROM ${getTable()} ${where} ${getGroup()} ${order} ${limit}`;
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
export function findBySQL(obj, callback) {
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
