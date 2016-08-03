// Local Dependencies
import * as Db from './db/mysql';
import { isDefined, isNumber } from './utils/is';
import { md5 } from './utils/security';
import { clean } from './utils/string';

/**
 * Performs a SQL Query
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function executeQuery(sql, callback) {
  return Db.query(sql, callback);
}

/**
 * Gets Columns Information
 *
 * @param {string} table Table
 * @param {function} callback Callback
 * @param {function} fn Callback
 * @returns {callback} Callback
 */
export function getColumns(table, callback, fn) {
  return query(`SHOW COLUMNS FROM ${table}`, callback, fn);
}

/**
 * Gets Schema from a given table
 *
 * @param {object} data Includes the table & ignoreFields
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function getSchemaFrom(data, callback) {
  const ignoreFields = data.ignoreFields || [];

  getColumns(data.table, callback, (columns, callback) => {
    const schema = {};

    if (columns) {
      columns.forEach(column => {
        let props = {};
        const field = column.Field;
        const primaryKey = column.Key === 'PRI';
        const columnType = column.Type;
        const noRender = ignoreFields.indexOf(field) > -1 || primaryKey;
        const getInputInfo = () => {
          let inputType = 'input';
          let className = 'input';
          let options = '';

          if (columnType.search('tinyint') > -1) {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.state';
            className = `select ${field}`;
          } else if (columnType.search('text') > -1) {
            inputType = 'textarea';
            className = `textarea editor ${field}`;
          } else if (columnType.search('datetime') > -1) {
            inputType = 'datapicker';
            className = `datapicker ${field}`;
          } else if (field === 'language' && columnType.search('varchar') > -1) {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.languages';
            className = `select ${field}`;
          } else if (field === 'state') {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.state';
            className = `select ${field}`;
          }

          return {
            inputType,
            options,
            className
          };
        };

        const inputInfo = getInputInfo();

        if (primaryKey) {
          props = {
            primaryKey: primaryKey,
            render: !noRender
          };
        } else if (noRender) {
          props = {
            render: !noRender
          };
        } else {
          props = {
            type: inputInfo.inputType,
            className: inputInfo.className,
            label: `Dashboard.forms.fields.${field}`,
            render: !noRender
          };
        }

        if (inputInfo.inputType === 'select') {
          props.options = inputInfo.options;
        }

        schema[field] = props;
      });
    }

    return callback(schema);
  });
}

/**
 * Gets Procedure Query
 *
 * @param {string} procedure Procedure name
 * @param {object} values Values
 * @param {object} fields Fields
 * @param {function} callback Callback
 * @returns {callback} Callback
 */
export function getProcedure(procedure, values, fields) {
  const keys = Object.keys(values);
  const total = fields.length - 1;
  let encrypted = false;
  let i = 0;
  let params = '';
  let value;

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
        if (!isDefined(filter)) {
          value = `'${value}'`;
        } else {
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

/**
 * Performs a SQL Query and returns a callback
 *
 * @param {string} sql SQL Query
 * @param {function} callback Callback
 * @param {function} fn Callback
 * @returns {callback} Callback
 */
export function query(sql, callback, fn) {
  executeQuery(sql, (error, result) => {
    return fn(result, callback);
  });
}
