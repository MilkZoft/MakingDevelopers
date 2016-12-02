export default (req, res, next) => {
  // Methods
  res.blogAPI = {
    post,
    posts
  };

  function post(query, callback) {
    query.state = 'published';

    res.BlogModel.cms().post({
      query
    }, (cache, results) => {
      return callback(cache, results);
    });
  }

  function posts(query, callback) {
    const {
      page = 1,
      language = 'en',
      state = 'published'
    } = query;

    res.BlogModel.cms().countPosts(total => {
      res.BlogModel.cms().posts({
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
