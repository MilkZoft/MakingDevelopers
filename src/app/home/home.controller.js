import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('app/home/index', {
    user: res.session('user').username
  });
});

export default router;
