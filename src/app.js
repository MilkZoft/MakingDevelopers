import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import stylus from 'stylus';

import $config from './lib/config';
import hbsHelpers from './lib/handlebars';

import router from './router';

const app = express();

// Stylus middleware
if (!$config().html.css.stylusPrecompile) {
  app.use(
    stylus.middleware({
      src: path.join(__dirname, '/stylus'),
      dest: path.join(__dirname, '/public/css'),
      compile: (str, path) => {
        return stylus(str)
          .set('filename', path)
          .set('compress', true);
      }
    })
  );
}

// Sending config to templates
app.use((req, res, next) => {
  res.locals.config = $config();
  next();
});

// Handlebars setup
app.engine($config().views.engine, exphbs({
  extname: $config().views.extension,
  defaultLayout: $config().views.layout,
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
  helpers: hbsHelpers
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', $config().views.engine);

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
router(app);

// Disabling x-powered-by
app.disable('x-powered-by');

// Listening port...
app.listen($config().serverPort || 3000);
