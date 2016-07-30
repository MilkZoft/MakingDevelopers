import express from 'express';

const router = express.Router();
const renderOptions = {};

/**
 * Blog index
 */
router.get('/', (req, res, next) => {
  renderOptions.siteName = 'MakingDevelopers';
  renderOptions.visits = res.session('visits') || 0;

  res.session('visits', ++renderOptions.visits);

  res.render('blog/welcome', renderOptions);
});

export default router;
