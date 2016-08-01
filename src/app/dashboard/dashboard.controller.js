import express from 'express';

const router = express.Router();

/**
 * Dashboard index
 */
router.get('/', (req, res) => {
  // Setting layout
  res.renderScope.default({
    layout: 'dashboard.hbs'
  });

  res.profileAllowed(userInfo => {
    res.renderScope.set('userInfo', userInfo);

    res.render('app/dashboard/index', res.renderScope.get());
  });
});

/**
 * Dashboard: Ads || Add Ad
 */
router.get('/ads/:action*?', (req, res) => {
  // Ads actions
});

/**
 * Dashboard: Blog || Add Post
 */
router.use('/blog/:action*?', (req, res) => {
  res.blogDashboard[res.action()]();
});

/**
 * Dashboard: Config
 */
router.get('/config', (req, res) => {
  // Config
});

/**
 * Dashboard: Feedback
 */
router.get('/feedback', (req, res) => {
  // Feedback
});

/**
 * Dashboard: Pages || Add Page
 */
router.get('/pages/:action*?', (req, res) => {
  // Pages
});

/**
 * Dashboard: Polls || Add Poll
 */
router.get('/polls/:action*?', (req, res) => {
  // Polls
});

/**
 * Dashboard: Users || Add User
 */
router.get('/users/:action*?', (req, res) => {
  // Users
});

export default router;
