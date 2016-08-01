import express from 'express';
import * as Users from './users.model';
import { isDefined } from '../../lib/utils/is';

const router = express.Router();
const renderOptions = {};

/**
 * Validates that the user is connected
 */
router.get('/validation', (req, res, next) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const connectedUser = res.session('user');

    Users.getUser({
      network: connectedUser.network,
      networkId: connectedUser.networkId,
      username: connectedUser.username,
      password: false
    }, (userInfo) => {
      if (userInfo) {
        res.redirect('/');
      } else {
        res.redirect('/users/register');
      }
    });
  } else {
    res.redirect('/');
  }
});

/**
 * Logout: destroy sessions.
 */
router.get('/logout', (req, res, next) => {
  res.destroySessions();

  res.redirect('/');
});

/**
 * Renders login view
 */
router.get('/login', (req, res, next) => {
  res.render('users/login');
});

/**
 * Renders register view
 */
router.get('/register', (req, res, next) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const connectedUser = res.session('user');

    res.clearSession(['user', 'oauth']);

    renderOptions.user = connectedUser;

    res.render('app/users/register', renderOptions);
  } else {
    renderOptions.user = false;

    res.render('app/users/register', renderOptions);
  }
});

/**
 * Register a new user
 */
router.post('/registration', (req, res, next) => {
  var post = res.getAllPost();

  Users.save(post, (state) => {
    if (!isDefined(state)) {
      res.redirect('/');
    } else {
      renderOptions.message = res.content('Users.register.success');
      renderOptions.alertType = 'success';
      renderOptions.iconType = 'fa-check';

      if (isDefined(state[0][0].error)) {
        renderOptions.message = res.__.Db.errors[state[0][0].error];
        renderOptions.alertType = 'danger';
        renderOptions.iconType = 'fa-times';
      }

      res.render('app/users/registered', renderOptions);
    }
  });
});

export default router;
