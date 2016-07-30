import Model from '../../lib/model';

const Blog = new Model();

const fields = [
  'title',
  'slug',
  'excerpt',
  'content',
  'codes',
  'tags',
  'author',
  'createdAt',
  'day',
  'month',
  'year',
  'language',
  'activeComments',
  'state'
];

export default {
  save
};

function save(post, callback) {
  const procedure = Blog.getProcedure('savePost', post, fields, false);

  Blog.query(procedure, callback, (result, callback) => {
    callback(result);
  });
}
