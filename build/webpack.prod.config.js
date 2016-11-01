import merge from "webpack-merge";
import webpack from 'webpack';
import path from 'path';
import baseWebpackConfig from "./webpack.base.config.js";
import config from './config.js'
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';

var env = process.env.NODE_ENV === "production"
  ? "production"
  : config.build.env;

var API_URL = process.env.NODE_ENV === "production"
  ? JSON.stringify('http://relation.gamebox.360.cn')
  : JSON.stringify('http://relation.test.gamebox.360.cn');

const betaPath = path.join(config.betaRoot, config.projectName);
const releasePath = path.join(config.wwwRoot, config.projectName);
var assetsPath = process.env.NODE_ENV === "production"
  ? releasePath
  : betaPath;

module.exports = merge(baseWebpackConfig, {
  output: {
    path: assetsPath,
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  devtool: config.build.productionSourceMap
    ? '#source-map'
    : false,
  plugins: [
    new webpack.DefinePlugin({
      // 全局变量 process.env.API_URL
      "process.env": {
        NODE_ENV: env,
        'API_URL': API_URL,
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.DedupePlugin(),
    // 提取css
    // new ExtractTextPlugin('css/[name].[contenthash].css'),
    // 注入模板
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
      }
    }),
    // 提取的WebPack runtime 和 module清单，以防止打包时vendor更新
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest', chunks: ['vendor']})
  ]
})
