// Model
import * as Blog from '../../lib/model';

export default (req, res, next) => {
  // Methods
  res.BlogModel = {
    getSchema,
    savePost
  };

  // Global vars
  const table = 'blog';

  res.content('Dashboard.forms.fields.error', true);

  // Required fields
  const requiredFields = {
    title: res.content('title'),
    slug: res.content('slug'),
    excerpt: res.content('excerpt'),
    content: res.content('content'),
    author: res.content('author')
  };

  function getSchema(callback) {
    const data = {
      table,
      requiredFields
    };

    Blog.getSchemaFrom(data, callback, (schema, noRender, callback) => {
      callback(schema);
    });
  }

  function savePost(post, callback) {
    const fields = Object.keys(post);
    let save = true;
    const errorMessages = {};

    fields.forEach(field => {
      if (requiredFields[field] && post[field] === '') {
        save = false;
        errorMessages[field] = requiredFields[field];
      }
    });

    if (save) {
      const procedure = Blog.getProcedure('savePost', post, fields, false);

      Blog.query(procedure, callback, (result, callback) => {
        callback(result);
      });
    } else {
      return callback(false, errorMessages);
    }
  }

  return next();
};
