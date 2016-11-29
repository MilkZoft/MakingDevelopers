// Dependencies
import express from 'express';

// Express Router
const Router = express.Router();

/**
 * Dashboard index
 */
Router.get('/', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  // If user is connected...
  res.profileAllowed(connectedUser => {
    res.render('app/dashboard/index', res.renderScope.get());
  });
});

/**
 * Dashboard: Blog Actions
 */
Router.use('/blog/:action*?', (req, res) => {
  res.blogDashboard[res.action()]();
});

/**
 * Dashboard: Media Actions
 */
Router.use('/media/upload', (req, res) => {
  res.mediaDashboard.upload();
});


export default Router;
