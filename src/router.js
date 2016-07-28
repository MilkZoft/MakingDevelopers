import $config from './lib/config';
import i18n from './lib/i18n';
import utils from './lib/utils';

import contentController from './app/content/content.controller';
import dashboardController from './app/dashboard/dashboard.controller';
import homeController from './app/home/home.controller';

export default (app) => {
  const availableLanguages = $config().languages.list.join('|');

  // i18n
  app.use((req, res, next) => {
    res.__ = res.locals.__ = i18n.load(i18n.getCurrentLanguage(req.url));
    res.locals.currentLanguage = i18n.getCurrentLanguage(req.url);

    return next();
  });

  // basePath
  app.use((req, res, next) => {
    res.locals.basePath = `${$config().baseUrl}${i18n.getLanguagePath(req.url)}`;

    return next();
  });

  // Device detector
  app.use((req, res, next) => {
    res.locals.isMobile = utils.Device.isMobile(req.headers['user-agent']);

    return next();
  });

  // Default css & js
  app.use((req, res, next) => {
    res.locals.css = [
      '/css/style.css'
    ];

    res.locals.topJs = [];
    res.locals.bottomJs = [];

    return next();
  });

  // Controllers dispatch
  app.use('/', homeController);
  app.use(`/:language(${availableLanguages})`, homeController);
  app.use(`/:language(${availableLanguages})/dashboard`, dashboardController);
  app.use('/content', contentController);

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
