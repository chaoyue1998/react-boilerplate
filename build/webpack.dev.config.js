const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require("./webpack.base.config.js")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config.js')

module.exports = merge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: process.env.NODE_ENV || config.dev.env,
        'API_URL': JSON.stringify('http://relation.test.gamebox.360.cn')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({filename: 'index.html', template: 'index.html', inject: true})
  ]
})
