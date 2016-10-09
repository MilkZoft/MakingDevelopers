// Dependencies
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

// Configuration
import { $serverPort, $webpack } from '../../lib/config';
import webpackConfig from '../../../webpack.config.babel.js';

export default () => {
  const server = new webpackDevServer(webpack(webpackConfig), {
    proxy: {
      '*': `http://localhost:${$serverPort()}`
    }
  });

  server.listen($webpack().port, 'localhost');
};
