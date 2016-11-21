// Helpers
import * as Blog from '../../lib/model';
import { getPaginationLimit } from '../../lib/pagination';

// Utils
import { year, month, day } from '../../lib/utils/date';
import { forEach, keys, parseObject } from '../../lib/utils/object';

export default (req, res, next) => {
  // Methods
  res.BlogModel = {
    dashboard
  };

  // Global vars
  const table = 'blog';

  // Response data for table schema
  const resData = {
    __: res.__,
    basePath: res.basePath,
    currentDashboardApp: res.currentDashboardApp
  };

  // Required fields
  res.content('Dashboard.forms.fields.error', true);

  const requiredFields = {
    title: res.content('title'),
    slug: res.content('slug'),
    excerpt: res.content('excerpt'),
    content: res.content('content'),
    author: res.content('author')
  };

  // Hidden Elements
  const hiddenElements = {
    createdAt: `${year()}/${month()}/${day()}`,
    year: year(),
    month: month(),
    day: day()
  };

  function dashboard() {
    return {
      countAllPosts,
      deleteAction,
      deletePost,
      getAllPosts,
      getPost,
      getSchema,
      removeAction,
      removePost,
      restoreAction,
      restorePost,
      savePost,
      search,
      updatePost
    };

    function countAllPosts(callback) {
      Blog.countAllRowsFrom(table, (total) => {
        callback(total);
      });
    }

    function deleteAction(rows, callback) {
      Blog.deleteRows(table, rows, () => {
        callback();
      });
    }

    function deletePost(id, callback) {
      Blog.deleteRow(table, id, () => {
        callback();
      });
    }

    function getAllPosts(total, callback) {
      const limit = getPaginationLimit(req.params, total);

      const data = {
        table,
        fields: 'id, title, language, author, state',
        order: 'id desc',
        limit
      };

      Blog.findAll(data, (error, result) => {
        const tableSchema = Blog.getTableSchema(result, resData);

        callback(tableSchema);
      });
    }

    function getPost(id, callback) {
      const data = {
        table,
        id
      };

      Blog.find(data, (error, result) => {
        callback(parseObject(result[0]));
      });
    }

    function getSchema(callback) {
      const data = {
        table,
        requiredFields,
        hiddenElements
      };

      Blog.getSchemaFrom(data, callback, (schema, noRender, callback) => {
        callback(schema);
      });
    }

    function removeAction(rows, callback) {
      Blog.removeRows(table, rows, () => {
        callback();
      });
    }

    function removePost(id, callback) {
      Blog.removeRow(table, id, () => {
        callback();
      });
    }

    function restoreAction(rows, callback) {
      Blog.restoreRows(table, 'draft', rows, () => {
        callback();
      });
    }

    function restorePost(id, callback) {
      Blog.restoreRow(table, 'draft', id, () => {
        callback();
      });
    }

    function savePost(data, callback) {
      const fields = keys(data);
      let save = true;
      const errorMessages = {};
      const validateIfExists = {
        title: data.title,
        slug: data.slug,
        day: data.day,
        month: data.month,
        year: data.year
      };

      forEach(fields, field => {
        if (requiredFields[field] && data[field] === '') {
          save = false;
          errorMessages[field] = requiredFields[field];
        }
      });

      if (save) {
        Blog.existsRow(table, validateIfExists, (exists) => {
          if (!exists) {
            Blog.insertRow(table, data, callback, (result, callback) => {
              callback(result);
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
        fields: 'id, title, language, author, state',
        searchBy: 'title',
        searchTerm
      };

      Blog.search(data, (result) => {
        const tableSchema = Blog.getTableSchema(result, resData);

        callback(tableSchema);
      });
    }

    function updatePost(data, callback) {
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
        Blog.existsRow(table, validateIfExists, (exists) => {
          if (exists) {
            Blog.updateRow(table, data, res.currentId, callback, (result, callback) => {
              callback(result);
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
