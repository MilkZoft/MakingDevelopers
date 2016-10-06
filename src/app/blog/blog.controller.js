// NPM Dependencies
import express from 'express';

// Global vars
const Router = express.Router();
const renderOptions = {};

/**
 * Blog index
 */
Router.get('/', (req, res, next) => {
  renderOptions.siteName = 'MakingDevelopers';
  renderOptions.visits = res.session('visits') || 0;

  res.session('visits', ++renderOptions.visits);

  res.render('app/blog/index', renderOptions);
});

export default Router;
