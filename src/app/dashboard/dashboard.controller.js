// Dependencies
import express from 'express';

// Helpers
import { getMedia } from '../../lib/media';

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
  // Setting layout & media
  res.renderScope.default({
    layout: 'dashboard.hbs',
    media: getMedia()
  });

  res.blogDashboard[res.action()]();
});

/**
 * Dashboard: Configuration Actions
 */
Router.use('/configuration/:action*?', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  res.configurationDashboard[res.action()]();
});

/**
 * Dashboard: Content Actions
 */
Router.use('/content/:action*?', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  res.contentDashboard[res.action()]();
});

/**
 * Dashboard: Media Actions
 */
Router.use('/media/upload', (req, res) => {
  res.mediaDashboard.upload();
});

/**
 * Dashboard: Pages Actions
 */
Router.use('/pages/:action*?', (req, res) => {
  // Setting layout & media
  res.renderScope.default({
    layout: 'dashboard.hbs',
    media: getMedia()
  });

  res.pagesDashboard[res.action()]();
});

export default Router;
