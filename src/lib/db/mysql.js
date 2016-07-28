import $config from '../config';
import mysql from 'mysql';

const connection = mysql.createConnection({
  database: $config().db.mysql.database,
  host: $config().db.mysql.host,
  password: $config().db.mysql.password,
  port: $config().db.mysql.port,
  user: $config().db.mysql.user
});

export default {
  find,
  findAll,
  findBy,
  findBySQL,
  findFirst,
  findLast,
  query
};

function getQuery(obj, find) {
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

function find(obj, callback) {
  if (!obj.id) {
    return false;
  }

  return connection.query(getQuery(obj), callback);
}

function findAll(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

function findBy(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

function findBySQL(obj, callback) {
  return connection.query(getQuery(obj), callback);
}

function findFirst(obj, callback) {
  return connection.query(getQuery(obj, 'first'), callback);
}

function findLast(obj, callback) {
  if (!obj.key) {
    return false;
  }

  return connection.query(getQuery(obj, 'last'), callback);
}

function query(sql, callback) {
  return sql
    ? connection.query(sql, callback)
    : false;
}
