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
    layout: 'dashboard.hbs',
    connectedUser: res.connectedUser
  });

  // If user is connected...
  res.profileAllowed(connectedUser => {
    res.render('app/dashboard/index', res.renderScope.get());
  });
});

/**
 * Dashboard: Blog || Add Post
 */
Router.use('/blog/:action*?', (req, res) => {
  res.blogDashboard[res.action()]();
});


export default Router;
