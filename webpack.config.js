const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const buildPath = path.join(__dirname, 'lib')
const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const defaultPlugins = [
  new webpack.IgnorePlugin(/^electron$/),
  new webpack.LoaderOptionsPlugin({
    minimize: isProd,
    debug: !isProd
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(nodeEnv)
  })
]

const shebangPlugin = new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })

const libConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  context: path.join(__dirname, '.'),
  entry: {
    index: './src/index.js',
    'utils/fb': './src/utils/fb.js',
    'utils/flatten': './src/utils/flatten.js',
    'utils/pipePromises': './src/utils/pipePromises.js'
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    library: 'bestScheduledTweets',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: { cacheDirectory: '.babel_cache' }
          }
        ]
      }
    ]
  },
  plugins: defaultPlugins
}

const cliConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'node',
  context: path.join(__dirname, '.'),
  entry: ['./src/cli.js'],
  output: {
    path: buildPath,
    filename: 'cli.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            query: { cacheDirectory: '.babel_cache' }
          }
        ]
      }
    ]
  },
  plugins: [shebangPlugin].concat(defaultPlugins)
}

module.exports = [libConfig, cliConfig]
