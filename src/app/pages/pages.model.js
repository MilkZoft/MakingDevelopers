// Helpers
import * as Model from '../../lib/model';
import { getPaginationLimit } from '../../lib/pagination';

// Utils
import { forEach, keys, parseObject } from '../../lib/utils/object';

export default (req, res, next) => {
  // * Global vars
  const table = 'pages';
  const modelName = `${table}Model`;
  const fields = 'id, title, author, language, state';
  const order = 'id desc';
  const searchBy = ['title'];

  // * Required fields
  res.content('Dashboard.forms.fields.error', true);

  const requiredFields = {
    title: res.content('title'),
    slug: res.content('slug'),
    content: res.content('content'),
    author: res.content('author')
  };

  // * Hidden Elements
  const hiddenElements = {};

  // Response data for table schema
  const resData = {
    __: res.__,
    basePath: res.basePath,
    currentDashboardApp: res.currentDashboardApp
  };

  // * Validate if exists
  const validateIfExists = data => {
    return {
      title: data.title,
      slug: data.slug,
      language: data.language
    };
  };

  // Methods
  res[modelName] = {
    dashboard
  };

  function dashboard() {
    return {
      count,
      deleteAction,
      deleteRow,
      getRows,
      getRow,
      getSchema,
      removeAction,
      removeRow,
      restoreAction,
      restoreRow,
      saveRow,
      search,
      updateRow
    };

    function count(callback) {
      Model.countAllRowsFrom(table, total => {
        return callback(total);
      });
    }

    function deleteAction(rows, callback) {
      Model.deleteRows(table, rows, () => {
        return callback();
      });
    }

    function deleteRow(id, callback) {
      Model.deleteRow(table, id, () => {
        return callback();
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

    function removeAction(rows, callback) {
      Model.removeRows(table, rows, () => {
        return callback();
      });
    }

    function removeRow(id, callback) {
      Model.removeRow(table, id, () => {
        return callback();
      });
    }

    function restoreAction(rows, callback) {
      Model.restoreRows(table, 'Active', rows, () => {
        return callback();
      });
    }

    function restoreRow(id, callback) {
      Model.restoreRow(table, 'Active', id, () => {
        return callback();
      });
    }

    function saveRow(data, callback) {
      const fields = keys(data);
      let save = true;
      const errorMessages = {};

      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          save = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (save) {
        Model.existsRow(table, validateIfExists(data), exists => {
          if (!exists) {
            Model.insertRow(table, data, callback, (result, callback) => {
              return callback(result);
            });
          } else {
            return callback(false, 'exists');
          }
        });
      } else {
        return callback(false, errorMessages);
      }
    }

    function search(searchTerm, callback) {
      const data = {
        table,
        fields,
        searchBy,
        searchTerm
      };

      Model.search(data, result => {
        const tableSchema = Model.getTableSchema(result, resData);

        return callback(tableSchema);
      });
    }

    function updateRow(data, callback) {
      const fields = keys(data);
      let edit = true;
      const errorMessages = {};
      const validateIfExists = {
        id: res.currentId
      };

      // Removing createdAt, year, month and day
      if (data.createdAt && data.year && data.month && data.day) {
        delete data.createdAt;
        delete data.year;
        delete data.month;
        delete data.day;
      }

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
