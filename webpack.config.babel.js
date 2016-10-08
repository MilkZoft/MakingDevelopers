// Dependencies
import path from 'path';
import merge from 'webpack-merge';
import webpack from 'webpack';
import npmInstallPlugin from 'npm-install-webpack-plugin';

// Configuration
import { $webpack } from './src/server/lib/config';

const isProduction = process.env.NODE_ENV === 'production';

const PATHS = {
  app: path.join(__dirname, $webpack().paths.app),
  build: path.join(__dirname, $webpack().paths.build)
};

let configuration = {
  entry: [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://localhost:${$webpack().port}`,
    PATHS.app
  ],
  resolve: {
    extensions: $webpack().extensions
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css%/,
        loaders: ['style!css', 'css'],
        include: PATHS.app
      },
      {
        test: /\.js?$/,
        loader: ['babel'],
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'stage-0']
        },
        include: PATHS.app
      }
    ]
  }
};

if (!isProduction) {
  configuration = merge(configuration, {
    devtool: $webpack().devtool,
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
      new npmInstallPlugin({
        save: true
      })
    ]
  });
}

module.exports = configuration;
