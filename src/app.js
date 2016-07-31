import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';
import stylus from 'stylus';

import { $html, $views, $serverPort } from './lib/config';

import * as hbsHelper from './lib/handlebars';
import contentHelper from './lib/content';
import postHelper from './lib/post';
import sessionHelper from './lib/session';
import templatesHelper from './lib/templates';
import userHelper from './lib/user';

import router from './router';

const app = express();

// Stylus middleware
if (!$html().css.stylusPrecompile) {
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

// Templates
app.use(templatesHelper);

// Post
app.use(postHelper);

// Content
app.use(contentHelper);

// Cookies / Session / User
app.use(cookieParser());
app.use(sessionHelper);
app.use(userHelper);

// BodyParser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
app.engine($views().engine, exphbs({
  defaultLayout: $views().layout,
  extname: $views().extension,
  helpers: hbsHelper,
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials')
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', $views().engine);

// Router
router(app);

// Listening port...
app.listen($serverPort() || 3000);
