// Model
import * as Blog from '../../lib/model';

// Global vars
const table = 'blog';
const ignoreFields = [
  'createdAt',
  'day',
  'month',
  'year'
];

export function getSchema(callback) {
  const data = {
    table,
    ignoreFields
  };

  Blog.getSchemaFrom(data, callback, (schema, noRender, callback) => {
    callback(schema);
  });
}

export function save(post, callback) {
  const procedure = Blog.getProcedure('savePost', post, fields, false);

  Blog.query(procedure, callback, (result, callback) => {
    callback(result);
  });
}
