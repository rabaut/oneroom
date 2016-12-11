var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    game: path.join(__dirname, 'js/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.js.map'
  },
  resolve: {
    alias: {
      'assets': path.join(__dirname, 'assets'),
      'css': path.join(__dirname, 'css')
    },
    extensions: ['', '.js']
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.join(__dirname, 'index.html')
    })
  ],
  module: {
    preLoaders: [
      { test: /\.js?$/, loader: 'source-map' }
    ],
    loaders: [
      { test: /\.js?$/, loader: 'babel',
        exclude: /(node_modules)/
      },
      { test: /\.css$/, loader: "style!css"},
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=[path][name].[ext]' }
    ],
    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform?brfs'
      },
      {
       include: path.resolve(__dirname, 'node_modules/pixi.js'),
       loader: 'ify'
     }
    ]
  }
}
