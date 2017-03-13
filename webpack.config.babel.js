import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

const babelPlugins = JSON.parse(fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf8')).plugins;
// removes "transform-es2015-modules-commonjs" plugin (modules are managed by webpack)
babelPlugins.splice(babelPlugins.indexOf('transform-es2015-modules-commonjs'), 1);

const buildPath = path.join(__dirname, 'lib');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const defaultPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: isProd,
    debug: !isProd,
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv),
  }),
];

const shebangPlugin = new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true });

const libConfig = {
  target: 'node',
  context: path.join(__dirname, '.'),
  entry: {
    index: './src/index.js',
    'utils/fb': './src/utils/fb.js',
    'utils/flatten': './src/utils/flatten.js',
    'utils/pipePromises': './src/utils/pipePromises.js',
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    library: 'bestScheduledTweets',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [{ loader: 'json-loader', options: { loaderType: 'preLoader' } }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'babel-loader',
          query: { plugins: babelPlugins, cacheDirectory: '.babel_cache' },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('.'),
      'node_modules',
    ],
  },
  plugins: defaultPlugins,
};

const cliConfig = {
  target: 'node',
  context: path.join(__dirname, '.'),
  entry: ['./src/cli.js'],
  output: {
    path: buildPath,
    filename: 'cli.js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: [{ loader: 'json-loader', options: { loaderType: 'preLoader' } }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'babel-loader',
          query: { plugins: babelPlugins, cacheDirectory: '.babel_cache' },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('.'),
      'node_modules',
    ],
  },
  plugins: [shebangPlugin].concat(defaultPlugins),
};

module.exports = [libConfig, cliConfig];
