export default (req, res, next) => {
  // Methods
  res.blogAPI = {
    post,
    posts
  };

  function post(query, callback) {
    res.BlogModel.cms().post({
      query
    }, (cache, results) => {
      return callback(cache, results);
    });
  }

  function posts(query, callback) {
    const {
      page = 1,
      language = 'en'
    } = query;

    res.BlogModel.cms().countPosts(total => {
      res.BlogModel.cms().posts({
        total,
        page,
        language
      }, (cache, results) => {
        return callback(cache, results);
      });
    });
  }

  return next();
};
