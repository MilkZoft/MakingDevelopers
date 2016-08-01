import * as Blog from '../../lib/model';

export function getSchema(callback) {
  const data = {
    table: 'blog',
    ignoreFields: [
      'createdAt',
      'day',
      'month',
      'year'
    ]
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
