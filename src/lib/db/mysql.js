import { $db } from '../config';
import mysql from 'mysql';

const connection = mysql.createConnection({
  database: $db().mysql.database,
  host: $db().mysql.host,
  password: $db().mysql.password,
  port: $db().mysql.port,
  user: $db().mysql.user
});

export function getQuery(obj, find) {
  const getFields = () => obj.fields || '*';
  const getTable = () => obj.table;
  const getGroup = () => obj.group && ` GROUP BY ${obj.group} ` || '';
  const getOrder = () => obj.order && ` ORDER BY ${obj.order} ` || '';
  const getLimit = () => obj.limit && ` LIMIT ${obj.limit} ` || '';

  let limit = getLimit();
  let order = getOrder();
  let where = '';

  // Find by id
  if (obj.key && obj.id) {
    where = ` WHERE ${obj.key} = ${obj.id} `;
  }

  // Find by field
  if (obj.field && obj.value) {
    where = ` WHERE ${obj.field} = '${obj.value}' `;
  }

  // Find by SQL
  if (obj.query) {
    where = ` WHERE ${obj.query} `;
  }

  // Find first
  if (find) {
    limit = ' LIMIT 1 ';
  }

  if (find === 'last') {
    order = ` ORDER BY ${obj.key} DESC `;
  }

  return `SELECT ${getFields()} FROM ${getTable()}${where}${getGroup()}${order}${limit}`;
}

export function find(obj, callback) {
  if (!obj.id) {
    return false;
  }

  return connection.query(getQuery(obj), callback);
}

export function findAll(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

export function findBy(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

export function findBySQL(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

export function findFirst(obj, callback) {
  return connection.query(getQuery(obj, 'first'), callback);
}

export function findLast(obj, callback) {
  if (!obj.key) {
    return false;
  }

  return connection.query(getQuery(obj, 'last'), callback);
}

export function query(sql, callback) {
  return sql
    ? connection.query(sql, callback)
    : false;
}
