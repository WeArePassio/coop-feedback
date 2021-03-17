const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const resources = path.resolve('resources');
const feedbackFormDir = `${resources}/src/feedback-form`;
const publicPath = path.resolve('public');

const index = `${feedbackFormDir}/index.js`;
const indexFilename = 'feedback-form.html';
const indexTemplate = `${feedbackFormDir}/${indexFilename}`;

const proxyUrl = 'http://192.168.10.10';

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === 'production';

  let entry = {
    index,
  };
  let plugins = [
    new HtmlWebPackPlugin({
      filename: indexFilename,
      template: indexTemplate,
      chunks: ['index'],
    }),
    new Dotenv(),
  ];

  // config for non-production builds
  if (!isProductionBuild) {
  }

  return {
    entry,
    output: {
      path: publicPath,
      filename: '[name].[contenthash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader'],
        },
        {
          test: /\.css$/i,
          loader: 'css-loader',
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            outputPath: './img/',
          },
        },
      ],
    },
    plugins,
    devServer: {
      index: indexFilename,
      historyApiFallback: true,
      proxy: {
        '/api/*': proxyUrl,
        '/auth/*': proxyUrl,
        '/password/*': proxyUrl,
        '/sanctum/*': proxyUrl,
      },
    },
  };
};
