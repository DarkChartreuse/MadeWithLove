const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'inline-sourcemap',
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  context: path.join(__dirname, 'client'),
  devtool: 'inline-sourcemap',
  entry: '../client/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        loader: 'url',
        query: {
          limit: 10000,
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
};
