// Helpers
import * as Blog from '../../lib/model';

// Utils
import { year, month, day } from '../../lib/utils/date';
import { forEach, keys } from '../../lib/utils/object';

export default (req, res, next) => {
  // Methods
  res.BlogModel = {
    deletePost,
    getAllPosts,
    getSchema,
    savePost
  };

  // Global vars
  const table = 'blog';

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

  function deletePost(id, callback) {
    Blog.deleteRow(table, id, () => {
      callback();
    });
  }

  function getAllPosts(callback) {
    const data = {
      table,
      fields: 'id, title, author, state',
      order: 'id desc'
      // limit
    };

    Blog.findAll(data, (error, result) => {
      const tableSchema = Blog.getTableSchema(result, res.__);

      tableSchema.__ = res.__;
      tableSchema.basePath = res.basePath;
      tableSchema.currentDashboardApp = res.currentDashboardApp;

      callback(tableSchema);
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

  return next();
};
