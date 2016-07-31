import * as Blog from '../../lib/model';

export function getSchema(callback) {
  Blog.getSchemaFrom('blog', callback, (schema, callback) => {
    callback(schema);
  });
}

export function save(post, callback) {
  const procedure = Blog.getProcedure('savePost', post, fields, false);

  Blog.query(procedure, callback, (result, callback) => {
    callback(result);
  });
}
