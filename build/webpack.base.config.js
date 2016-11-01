const webpack = require('webpack');
const path = require('path');
const config = require("./config")
// const  ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: ["./src/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    //publicPath: "/dist/",
    filename: "app.js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
        // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }, {
        test: /\.js|jsx$/,
        loader: 'babel',
        // babel 不处理 node_modules
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  }
};
