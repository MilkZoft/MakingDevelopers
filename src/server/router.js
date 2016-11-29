// Helpers
import {
  availableLanguages,
  getCurrentLanguage,
  getLanguagePath,
  loadLanguage
} from '../lib/i18n';

// Utils
import { isMobile } from '../lib/utils/device';
import { sha1 } from '../lib/utils/security';
import { getCurrentApp } from '../lib/utils/url';

// Configuration
import { $baseUrl, $dashboard } from '../lib/config';

// Importing controllers
import apiController from '../app/api/api.controller';
import authController from '../app/auth/auth.controller';
import contentController from '../app/content/content.controller';
import dashboardController from '../app/dashboard/dashboard.controller';
import usersController from '../app/users/users.controller';

// React
import render from './servers/render';

// Imports
import imports from './imports';

export default (app) => {
  // Content machine
  app.use('/content', contentController);

  // Security token
  app.use((req, res, next) => {
    // If securityToken session does not exist, we create a new one.
    if (!res.session('securityToken')) {
      res.session('securityToken', sha1(new Date()));
    }

    // Sending the securityToken session to locals.
    res.locals.securityToken = res.session('securityToken');

    return next();
  });

  // i18n
  app.use((req, res, next) => {
    res.__ = res.locals.__ = loadLanguage(getCurrentLanguage(req.url));
    res.locals.currentLanguage = getCurrentLanguage(req.url);

    return next();
  });

  // base Url && basePath && currentUrl && currentApp
  app.use((req, res, next) => {
    res.locals.currentApp = res.currentApp = getCurrentApp(req.originalUrl);
    res.locals.currentDashboardApp = res.currentDashboardApp = getCurrentApp(req.originalUrl, true);
    res.locals.currentUrl = res.currentUrl = $baseUrl() + req.originalUrl;
    res.locals.baseUrl = res.baseUrl = $baseUrl();
    res.locals.basePath = res.basePath = `${$baseUrl()}${getLanguagePath(req.url)}`;

    return next();
  });

  // Dashboard
  app.use((req, res, next) => {
    res.locals.dashboard = $dashboard();

    // Limit to 17 characters to avoid breaking mobile
    if (res.locals.dashboard.title.length > 17) {
      res.locals.dashboard.title = res.locals.dashboard.title.substring(0, 17);
    }

    return next();
  });

  // Device detector
  app.use((req, res, next) => {
    res.locals.isMobile = isMobile(req.headers['user-agent']);

    return next();
  });

  // Default css & js
  app.use((req, res, next) => {
    res.locals.css = [
      `${$baseUrl()}/css/style.css`
    ];

    res.locals.topJs = [];
    res.locals.bottomJs = [];

    return next();
  });

  // Imports
  imports(app);

  // Controllers dispatch
  app.use('/api', apiController);
  app.use('/auth', authController);
  app.use('/dashboard', dashboardController);
  app.use(`/:language(${availableLanguages()})/dashboard`, dashboardController);
  app.use('/users', usersController);
  app.use(`/:language(${availableLanguages()})/users`, usersController);

  // React dispatch
  app.get('*', render);

  // Disabling x-powered-by
  app.disable('x-powered-by');

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  // development error handler
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      /* eslint no-console: 0 */
      console.log(err);

      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};
