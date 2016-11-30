// Helpers
import * as Blog from '../../lib/model';
import { getPaginationLimit } from '../../lib/pagination';

// Utils
import { year, month, day } from '../../lib/utils/date';
import { forEach, keys, parseObject } from '../../lib/utils/object';

export default (req, res, next) => {
  // Methods
  res.BlogModel = {
    cms,
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

  function cms() {
    return {
      countPosts,
      posts,
      post
    };

    function countPosts(callback) {
      Blog.countAllRowsFrom(table, (total) => {
        return callback(total);
      });
    }

    function post(requestQuery, callback) {
      const query = requestQuery.query;
      const data = {
        table,
        query
      };
      const {
        slug,
        day,
        month,
        year,
        language = 'en'
      } = query;

      const cacheKey = `post(${slug}, ${day}, ${month}, ${year}, ${language})`;

      // Returning cache if exists...
      res.cache.exists(cacheKey, (exists) => {
        if (exists) {
          res.cache.get(cacheKey, (reply) => {
            // Removing cache.
            res.cache.remove(cacheKey);

            return callback(true, reply);
          });
        } else {
          Blog.findByQuery(data, (error, result) => {
            // Saving cache with custom expirationTime (15 seconds)
            // res.cache.set(cacheKey, result, 15);

            // Saving cache with default expirationTime (3600 seconds = 1 hour)
            res.cache.set(cacheKey, result);

            return callback(false, result);
          });
        }
      });
    }

    function posts(requestQuery, callback) {
      const {
        page,
        total,
        language,
        state
      } = requestQuery;

      const limit = getPaginationLimit(page, total);

      const data = {
        table,
        fields: '*',
        order: 'id desc',
        limit,
        query: {
          language,
          state
        }
      };

      const cacheKey = `posts(${language}, ${limit})`;

      // Returning cache if exists...
      res.cache.exists(cacheKey, (exists) => {
        if (exists) {
          res.cache.get(cacheKey, (reply) => {
            // Removing cache.
            res.cache.remove(cacheKey);

            return callback(true, reply);
          });
        } else {
          Blog.findByQuery(data, (error, result) => {
            // Saving cache with custom expirationTime (15 seconds)
            // res.cache.set(`posts`, result, 15);

            // Saving cache with default expirationTime (3600 seconds = 1 hour)
            res.cache.set(cacheKey, result);

            return callback(false, result);
          });
        }
      });
    }
  }

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
        return callback(total);
      });
    }

    function deleteAction(rows, callback) {
      Blog.deleteRows(table, rows, () => {
        return callback();
      });
    }

    function deletePost(id, callback) {
      Blog.deleteRow(table, id, () => {
        return callback();
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

        return callback(tableSchema);
      });
    }

    function getPost(id, callback) {
      const data = {
        table,
        id
      };

      Blog.find(data, (error, result) => {
        return callback(parseObject(result[0]));
      });
    }

    function getSchema(callback) {
      const data = {
        table,
        requiredFields,
        hiddenElements
      };

      Blog.getSchemaFrom(data, callback, (schema, noRender, callback) => {
        return callback(schema);
      });
    }

    function removeAction(rows, callback) {
      Blog.removeRows(table, rows, () => {
        return callback();
      });
    }

    function removePost(id, callback) {
      Blog.removeRow(table, id, () => {
        return callback();
      });
    }

    function restoreAction(rows, callback) {
      Blog.restoreRows(table, 'draft', rows, () => {
        return callback();
      });
    }

    function restorePost(id, callback) {
      Blog.restoreRow(table, 'draft', id, () => {
        return callback();
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
        fields: 'id, title, language, author, state',
        searchBy: 'title',
        searchTerm
      };

      Blog.search(data, (result) => {
        const tableSchema = Blog.getTableSchema(result, resData);

        return callback(tableSchema);
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
