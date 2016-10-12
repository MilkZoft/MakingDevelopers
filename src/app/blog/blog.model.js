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

  // Required fields
  const requiredFields = {
    title: res.__.Dashboard.forms.fields.error.title,
    slug: res.__.Dashboard.forms.fields.error.slug,
    excerpt: res.__.Dashboard.forms.fields.error.excerpt,
    content: res.__.Dashboard.forms.fields.error.content,
    author: res.__.Dashboard.forms.fields.error.author
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
