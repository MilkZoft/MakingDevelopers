// NPM Dependencies
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import stylus from 'stylus';

// Local Dependencies
import * as hbsHelper from './lib/handlebars';
import contentHelper from './lib/content';
import sessionHelper from './lib/session';
import userHelper from './lib/user';

// Configuration
import { $html, $views, $serverPort } from './lib/config';

// Router
import router from './router';

// Starting express application
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
