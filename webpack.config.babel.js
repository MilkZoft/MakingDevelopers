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
  noInfo: false,
  entry: [
    'webpack-hot-middleware/client?reload=true',
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
    stats: 'errors-only'
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
