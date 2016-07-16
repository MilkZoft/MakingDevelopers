import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Dashboard'
  });
});

export default router;
