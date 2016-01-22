var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var port = 8899;

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './app',
    port: port
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:' + port,
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.less$/, include: path.resolve(__dirname, 'app'), loader: 'style!css!autoprefixer!less' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:' + port })
  ]
};
