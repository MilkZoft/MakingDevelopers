// Dependencies
import express from 'express';

// Utils
import { isFunction } from '../../lib/utils/is';
import { camelCase, sanitize } from '../../lib/utils/string';

// Express Router
const Router = express.Router();

Router.get('/blog/:endpoint*?', (req, res, next) => {
  const endpointMethod = camelCase(req.params.endpoint);
  const data = sanitize(req.query);

  if (isFunction(res.blogAPI[endpointMethod])) {
    return res.blogAPI[endpointMethod](data, (cache, response) => {
      res.json({
        information: {
          cache: cache || false,
          total: response.length,
          params: data
        },
        response
      });
    });
  } else {
    res.json({
      error: 'No data found'
    });
  }
});

export default Router;
