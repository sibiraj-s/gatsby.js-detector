// @ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig */

import path from 'node:path';
import fs from 'node:fs/promises';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MergeJsonPlugin from 'merge-json-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const browserTarget = process.env.BROWSER_TARGET ?? 'chrome';

const readPackageJson = async () => {
  const filePath = path.resolve(import.meta.dirname, 'package.json');
  const packageJson = await fs.readFile(filePath, 'utf8');
  return JSON.parse(packageJson);
};

const pkgJson = await readPackageJson();

/** @type WebpackConfig */
const config = {
  context: path.resolve(import.meta.dirname, 'src'),
  bail: isProduction,
  devtool: 'source-map',
  entry: {
    background: './background.js',
    gatsbyDetector: './gatsbyDetector.js',
    popup: './popup.js',
    shared: './shared.js',
  },
  output: {
    path: path.resolve(import.meta.dirname, 'dist', browserTarget),
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
        transform: (manifest) => ({ version: pkgJson.version, ...manifest }),
      }],
    }),
  ],
  optimization: {
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
  },
};

export default config;
