export default (req, res, next) => {
  // Methods
  res.blogAPI = {
    posts
  };

  function posts(callback) {
    callback({
      response: {
        foo: 'bar'
      }
    });
  }

  return next();
};
