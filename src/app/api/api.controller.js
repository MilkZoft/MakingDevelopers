// Dependencies
import express from 'express';

// Utils
import { camelCase } from '../../lib/utils/string';

// Express Router
const Router = express.Router();

Router.get('/blog/:endpoint*?', (req, res, next) => {
  const endpoint = camelCase(req.params.endpoint);

  return res.blogAPI[endpoint]((response) => {
    res.json(response);
  });
});

export default Router;
