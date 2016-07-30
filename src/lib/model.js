import * as Db from './db/mysql';
import { isDefined, /* isFunction ,*/ isNumber } from './utils/is';
import { md5 } from './utils/security';
import { clean } from './utils/string';

export function executeQuery(sql, callback) {
  Db.query(sql, callback);
}

export function getProcedure(procedure, values, fields, filter) {
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
    const getValue = () => {
      let value = values[encrypted ? md5(field) : field];

      if (!isDefined(value)) {
        value = '';
      }

      if (field === 'networkId') {
        value = `${clean(value.toString())}`;
      }

      if (!isNumber(value)) {
        // method = filters[field];

        if (!isDefined(filter)) {
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

      if (value === false) {
        value = '\'\'';
      }

      return value;
    };

    value = getValue();

    if (i === total) {
      if (value !== '') {
        params += value;
      }
    } else {
      if (value !== '') {
        params += `${value}, `;
        i++;
      }
    }
  });

  procedure = `CALL ${procedure} (${params});`;

  procedure = procedure.replace(', )', ')');

  return procedure.replace(new RegExp(', ,', 'g'), ', \'\',');
}

export function query(sql, callback, fn) {
  executeQuery(sql, (error, result) => {
    fn(result, callback);
  });
}
