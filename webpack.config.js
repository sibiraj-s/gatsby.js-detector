// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig */

const path = require('node:path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonPlugin = require('merge-json-webpack-plugin');

const { version } = require('./package.json');
const isProduction = process.env.NODE_ENV === 'production';
const browserTarget = process.env.BROWSER_TARGET ?? 'chrome';

/** @type WebpackConfig */
const config = {
  context: path.resolve(__dirname, 'src'),
  bail: isProduction,
  devtool: 'source-map',
  entry: {
    background: './background.js',
    gatsbyDetector: './gatsbyDetector.js',
    popup: './popup.js',
    shared: './shared.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist', browserTarget),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './images', to: 'images' },
        { from: './popups', to: 'popups' },
      ],
    }),
    new MergeJsonPlugin({
      minify: false,
      groups: [{
        files: [
          'manifest.json',
          `${browserTarget}.manifest.json`,
          `${isProduction ? 'prod' : 'dev'}.manifest.json`,
        ],
        to: 'manifest.json',
        transform: (manifest) => ({ version, ...manifest }),
      }],
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
};

module.exports = config;
