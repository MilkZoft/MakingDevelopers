import db from './db/mysql';
import { isDefined, /* isFunction ,*/ isNumber, isObject } from './utils/is';
import { md5 } from './utils/security';
import { clean } from './utils/string';

export default __construct;

function __construct(schema) {
  return {
    executeQuery: executeQuery,
    get: get,
    getProcedure: getProcedure,
    query: query
  };
}

function executeQuery(sql, callback) {
  db.query(sql, callback);
}

function get(q, callback) {
  const fields = Object.keys(q);
  const count = fields.length - 1;
  let query = '';
  let field;
  let value;
  let i;

  if (q === 'all') {
    schema.fields = schema.fields;

    db.findAll({
      table: schema.table,
      fields: schema.fields,
      group: schema.group,
      order: schema.order,
      limit: schema.limit
    }, callback);
  } else if (!isNaN(q)) {
    schema.key = schema.key;
    schema.fields = schema.fields;

    db.find({
      id: parseInt(q),
      table: schema.table,
      fields: schema.fields,
      key: schema.key
    }, callback);
  } else if (isObject(q)) {
    if (fields.length > 1) {
      for (i = 0; i <= count; i++) {
        if (i === count) {
          query += `${fields[i]} = '${q[fields[i]]}'`;
        } else {
          query += `${fields[i]} = '${q[fields[i]]}' AND `;
        }
      }

      db.findBySQL({
        query: query,
        table: schema.table,
        fields: schema.fields,
        group: schema.group,
        order: schema.order,
        limit: schema.limit
      }, callback);
    } else {
      field = fields[0];
      value = q[field];

      db.findBy({
        field: field,
        value: value,
        table: schema.table,
        fields: schema.fields,
        group: schema.group,
        order: schema.order,
        limit: schema.limit
      }, callback);
    }
  }

  return false;
}

function getProcedure(procedure, values, fields, filter) {
  const keys = Object.keys(values);
  const total = fields.length - 1;
  let encrypted = false;
  let filters = filter || {};
  let i = 0;
  // let method;
  let params = '';
  let value;

  if (!isDefined(filters)) {
    filters = {};
  }

  if (keys[0].length === 32) {
    encrypted = true;
  }

  fields.forEach(field => {
    value = values[encrypted ? md5(field) : field];

    if (!isDefined(value)) {
      value = '';
    }

    if (field === 'networkId') {
      value = `'${clean(value.toString())}'`;
    }

    if (!isNumber(value)) {
      method = filters[field];

      if (filter === false) {
        value = `'${value}'`;
      } else {
        // TODO: See how we can fix this.
        /* if (isDefined(method) && isFunction(utils[method])) {
          value = `'${utils[method](value)}'`;
        } else {
          value = `'${clean(value)}'`;
        }*/
        value = `'${clean(value)}'`;
      }
    }

    if (i === total) {
      params += value;
    } else {
      params += `${value}, `;
      i++;
    }
  });

  procedure = `CALL ${procedure} (${params});`;

  return procedure.replace(new RegExp(', ,', 'g'), ', \'\',');
}

function query(sql, callback, fn) {
  executeQuery(sql, (error, result) => {
    fn(result, callback);
  });
}
