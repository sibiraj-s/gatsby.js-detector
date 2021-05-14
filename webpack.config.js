const path = require('node:path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MergeJsonPlugin = require('merge-json-webpack-plugin');

const { version } = require('./package.json');
const WEBPACK_MODE = process.env.NODE_ENV || 'production';
const isProduction = WEBPACK_MODE === 'production';
const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'build');

const webpackConfig = {
  context: SRC_DIR,
  mode: WEBPACK_MODE,
  bail: isProduction,
  entry: {
    background: './background',
    gatsbyDetector: './gatsbyDetector',
    popup: './popup',
    shared: './shared',
  },
  output: {
    path: OUT_DIR,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:m)?js(?:x)?$/,
        exclude: /(?:node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
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
      group: [{
        files: [
          'manifest.json',
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

module.exports = webpackConfig;
