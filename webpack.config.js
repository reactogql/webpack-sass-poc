const path = require('path');

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: { main: './src/client/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].[chunkhash].js'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }, 
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }
    ]
  },
  plugins: [ 
    new UglifyJSPlugin({extractComments: 'all'}),
    new CleanWebpackPlugin('dist/public', {} ), 
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filetype: 'pug',
      hash: true,
      template: './src/views/layout.pug',
      filename: 'layout.pug'
    }),
    new WebpackMd5Hash()
  ]
};