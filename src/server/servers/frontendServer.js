// Dependencies
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Configuration
import webpackConfig from '../../../webpack.config.babel.js';

export default (app) => {
  // Webpack Configuration
  const compiler = webpack(webpackConfig);

  // Starting Webpack dev & hot servers
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
};
