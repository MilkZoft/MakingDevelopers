// NPM Dependencies
import express from 'express';

// Local Dependencies
import { isDefined } from '../../lib/utils/is';

// Model
import * as Users from './users.model';

// Express Router
const Router = express.Router();

// Global vars
const renderOptions = {};

/**
 * Validates that the user is connected
 */
Router.get('/validation', (req, res, next) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const connectedUser = res.session('user');

    Users.getUser({
      network: connectedUser.network,
      networkId: connectedUser.networkId,
      username: connectedUser.username,
      password: false
    }, (userInfo) => {
      if (userInfo) {
        return res.redirect('/');
      } else {
        return res.redirect('/users/register');
      }
    });
  } else {
    return res.redirect('/');
  }
});

/**
 * Logout: destroy sessions.
 */
Router.get('/logout', (req, res, next) => {
  res.destroySessions();

  return res.redirect('/');
});

/**
 * Renders login view
 */
Router.get('/login', (req, res, next) => {
  return res.render('users/login');
});

/**
 * Renders register view
 */
Router.get('/register', (req, res, next) => {
  if (isDefined(res.session('user')) && isDefined(res.session('oauth'))) {
    const connectedUser = res.session('user');

    res.clearSession(['user', 'oauth']);

    renderOptions.user = connectedUser;

    return res.render('app/users/register', renderOptions);
  } else {
    renderOptions.user = false;

    return res.render('app/users/register', renderOptions);
  }
});

/**
 * Register a new user
 */
Router.post('/registration', (req, res, next) => {
  var post = res.getAllPost();

  Users.save(post, (state) => {
    if (!isDefined(state)) {
      return res.redirect('/');
    } else {
      renderOptions.message = res.content('Users.register.success');
      renderOptions.alertType = 'success';
      renderOptions.iconType = 'fa-check';

      if (isDefined(state[0][0].error)) {
        renderOptions.message = res.__.Db.errors[state[0][0].error];
        renderOptions.alertType = 'danger';
        renderOptions.iconType = 'fa-times';
      }

      return res.render('app/users/registered', renderOptions);
    }
  });
});

export default Router;
