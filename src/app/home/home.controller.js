// NPM Dependencies
import express from 'express';

// Express Router
const Router = express.Router();

Router.get('/', (req, res, next) => {
  res.render('app/home/index', {
    user: res.session('user').username
  });
});

export default Router;
