// Helpers
import * as Model from '../../lib/model';
import { getPaginationLimit } from '../../lib/pagination';

// Utils
import { forEach, keys, parseObject } from '../../lib/utils/object';

export default (req, res, next) => {
  // * Global vars
  const table = 'configuration';
  const modelName = `${table}Model`;
  const fields = 'id, title, theme, application, language, state';
  const order = 'id desc';

  // * Required fields
  res.content('Dashboard.forms.fields.error', true);

  const requiredFields = {
    title: res.content('title'),
    theme: res.content('theme'),
    application: res.content('application'),
    language: res.content('language'),
    languages: res.content('languages')
  };

  // * Hidden Elements
  const hiddenElements = {};

  // Response data for table schema
  const resData = {
    __: res.__,
    basePath: res.basePath,
    currentDashboardApp: res.currentDashboardApp
  };

  // Methods
  res[modelName] = {
    dashboard
  };

  function dashboard() {
    return {
      count,
      getRows,
      getRow,
      getSchema,
      updateRow
    };

    function count(callback) {
      Model.countAllRowsFrom(table, total => {
        return callback(total);
      });
    }

    function getRows(total, callback) {
      const limit = getPaginationLimit(req.params, total);

      const data = {
        table,
        fields,
        order,
        limit
      };

      Model.findAll(data, (error, result) => {
        const tableSchema = Model.getTableSchema(result, resData);

        return callback(tableSchema);
      });
    }

    function getRow(id, callback) {
      const data = {
        table,
        id
      };

      Model.find(data, (error, result) => {
        return callback(parseObject(result[0]));
      });
    }

    function getSchema(callback) {
      const data = {
        table,
        requiredFields,
        hiddenElements
      };

      Model.getSchemaFrom(data, callback, (schema, noRender, callback) => {
        return callback(schema);
      });
    }

    function updateRow(data, callback) {
      const fields = keys(data);
      let edit = true;
      const errorMessages = {};
      const validateIfExists = {
        id: res.currentId
      };

      // Looking for errors
      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          edit = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (edit) {
        Model.existsRow(table, validateIfExists, exists => {
          if (exists) {
            Model.updateRow(table, data, res.currentId, callback, (result, callback) => {
              return callback(result);
            });
          } else {
            return callback(false, 'no exists');
          }
        });
      } else {
        return callback(false, errorMessages);
      }
    }
  }

  return next();
};
