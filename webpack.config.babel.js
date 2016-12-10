// Dependencies
import webpack from 'webpack';
import path from 'path';

// Configuration
import { $webpack } from './src/lib/config';

// Paths
const PATHS = {
  app: path.join(__dirname, $webpack().paths.app),
  build: path.join(__dirname, $webpack().paths.build)
};

export default {
  debug: true,
  devtool: $webpack().devtool,
  noInfo: true,
  entry: [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${$webpack().port}`,
    `${PATHS.app}`
  ],
  resolve: {
    extensions: $webpack().extensions
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: PATHS.build,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: $webpack().port
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: PATHS.app
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  }
};
