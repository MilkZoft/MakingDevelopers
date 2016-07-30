import express from 'express';

const router = express.Router();

/**
 * Dashboard index
 */
router.get('/', (req, res, next) => {
  res.render('app/dashboard/index', {
    layout: 'dashboard.hbs'
  });
});

/**
 * Dashboard: Ads || Add Ad
 */
router.get('/ads/:action*?', (req, res, next) => {
  // Ads actions
});

/**
 * Dashboard: Blog || Add Post
 */
router.use('/blog/:action*?', (req, res, next) => {
  res.blogDashboard[res.action()]();
});

/**
 * Dashboard: Config
 */
router.get('/config', (req, res, next) => {
  // Config
});

/**
 * Dashboard: Feedback
 */
router.get('/feedback', (req, res, next) => {
  // Feedback
});

/**
 * Dashboard: Pages || Add Page
 */
router.get('/pages/:action*?', (req, res, next) => {
  // Pages
});

/**
 * Dashboard: Polls || Add Poll
 */
router.get('/polls/:action*?', (req, res, next) => {
  // Polls
});

/**
 * Dashboard: Users || Add User
 */
router.get('/users/:action*?', (req, res, next) => {
  // Users
});

export default router;
