// Dependencies
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

// Configuration
import { $webpack } from '../../lib/config';
import webpackConfig from '../../../webpack.config.babel.js';

export default () => {
  const server = new webpackDevServer(webpack(webpackConfig), {
    noInfo: true
  });

  server.listen($webpack().port, 'localhost');
};
