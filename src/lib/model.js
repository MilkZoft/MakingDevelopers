// Local Dependencies
import * as Db from './db/mysql';
import { isDefined, isNumber } from './utils/is';
import { forEach, keys } from './utils/object';
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
  const requiredFields = keys(data.requiredFields) || [];
  const hiddenElements = data.hiddenElements || {};

  getColumns(data.table, callback, (columns, callback) => {
    const schema = {};

    if (columns) {
      forEach(columns, column => {
        let props = {};
        const field = column.Field;
        const primaryKey = column.Key === 'PRI';
        const columnType = column.Type;
        const noRender = ignoreFields.indexOf(field) > -1 || primaryKey;
        const getInputInfo = () => {
          let inputType = 'input';
          let className = 'input';
          let options = '';
          const required = requiredFields.indexOf(field) !== -1 ? data.requiredFields[field] : false;

          if (columnType.search('tinyint') > -1) {
            inputType = 'select';
            options = 'Dashboard.forms.fields.selects.decision';
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
            className,
            required
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
            required: inputInfo.required,
            render: !noRender
          };
        }

        if (inputInfo.inputType === 'select') {
          props.options = inputInfo.options;
        }

        schema[field] = props;
      });
    }

    schema.hiddenElements = hiddenElements;

    return callback(schema);
  });
}

/**
 * Gets Procedure Query
 *
 * @param {string} procedureName Procedure name
 * @param {object} values Values
 * @param {object} fields Fields
 * @param {string} filter Filter
 * @returns {callback} Callback
 */
export function getProcedure(procedureName, values, fields, filter) {
  const total = fields.length - 1;
  let i = 0;
  let params = '';
  let value;

  fields.forEach(field => {
    const getValue = () => {
      let value = values[field];

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

  let procedure = `CALL ${procedureName} (${params});`;

  procedure = procedure.replace(', )', ')');

  return procedure.replace(new RegExp(', ,', 'g'), ', \'\',');
}

export function insert(table, data, callback) {
  const sql = Db.getInsertQuery(table, data);

  query(sql, callback, (result, callback) => {
    callback(result);
  });
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
