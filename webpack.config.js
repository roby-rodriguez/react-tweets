'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var bootstrapPath = __dirname + '/node_modules/bootstrap/dist/css';
var bootstrapSocialPath = __dirname + '/node_modules/bootstrap-social';
var fontAwesomePath = __dirname + '/node_modules/font-awesome/css';

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/twitter.png'),
    path.resolve(__dirname, 'src/app')
  ],

  output: {
    path: path.resolve(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      //inject: 'body',
      filename: 'index.html',
      favicon: 'src/favicon.ico'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new ExtractTextPlugin('bundle.css')
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          "presets": [ "react", "es2015", "stage-0", "react-hmre" ],
          "plugins": [ "transform-decorators-legacy" ]
        }
      }, {
        test: /\.json?$/,
        loader: 'json-loader'
      },
/*      {
        test: /\.css$/,
        loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },*/
      //{ test: /\.less$/, loader: 'style!css!less', include: path.resolve(__dirname, 'src/styles') },
      { test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'), include: path.resolve(__dirname, 'src/styles') },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(png|jpg|jpeg|gif|ico)$/, loader: 'url-loader?limit=10000' }
    ]
  },

  // Automatically transform files with these extensions
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ['node_modules', bootstrapPath, bootstrapSocialPath, fontAwesomePath]
  },

  node: {
    dns: 'empty',
    net: 'empty'
  },

  // Additional plugins for CSS post processing using postcss-loader
  postcss: [
    require('autoprefixer'), // Automatically include vendor prefixes
    // require('postcss-nested') // Enable nested rules, like in Sass
  ]
};
