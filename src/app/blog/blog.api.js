export default (req, res, next) => {
  // Methods
  res.blogAPI = {
    post,
    posts
  };

  function post(query, callback) {
    query.state = 'Active';

    res.blogModel.cms().post({
      query
    }, (cache, results) => {
      return callback(cache, results);
    });
  }

  function posts(query, callback) {
    const {
      page = 1,
      language = 'en',
      state = 'Active'
    } = query;

    res.blogModel.cms().count(total => {
      res.blogModel.cms().posts({
        total,
        page,
        language,
        state
      }, (cache, results) => {
        return callback(cache, results);
      });
    });
  }

  return next();
};
