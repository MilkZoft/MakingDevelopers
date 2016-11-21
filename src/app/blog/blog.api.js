export default (req, res, next) => {
  // Methods
  res.blogAPI = {
    getAllPosts
  };

  function getAllPosts(callback) {
    res.BlogModel.countAllPosts(total => {
      res.BlogModel.getAllPosts(total, tableSchema => {
        callback(tableSchema);
      });
    });
  }

  return next();
};
