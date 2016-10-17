// Model
import * as Blog from '../../lib/model';

// Local Dependencies
import { year, month, day } from '../../lib/utils/date';

export default (req, res, next) => {
  // Methods
  res.BlogModel = {
    getHiddenElements,
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

  function getHiddenElements() {
    return hiddenElements;
  }

  function getSchema(callback) {
    const data = {
      table,
      requiredFields
    };

    Blog.getSchemaFrom(data, callback, (schema, noRender, callback) => {
      callback(schema);
    });
  }

  function savePost(data, callback) {
    const fields = Object.keys(data);
    let save = true;
    const errorMessages = {};

    fields.forEach(field => {
      if (requiredFields[field] && data[field] === '') {
        save = false;
        errorMessages[field] = requiredFields[field];
      }
    });

    if (save) {
      // const insertQuery = Blog.getInsertQuery(table, data);

      /*Blog.query(procedure, callback, (result, callback) => {
        callback(result);
      });*/
    } else {
      return callback(false, errorMessages);
    }
  }

  return next();
};
