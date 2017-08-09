'use strict'

const process = require('process')
const webpack = require('webpack')
const path = require('path')

const Dbust = require('webpack-dbust')
const CompressionPlugin = require('compression-webpack-plugin')

const debug   = process.env.NODE_ENV !== 'production'

function config(debug){
  // const name = 'main'
  // const filename = `${name}${debug ? '' : '-[chunkhash]'}.js`
  const plugins = []// [ new webpack.optimize.CommonsChunkPlugin({ name, filename }), ]

  if(!debug) plugins.push(...[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new Dbust(),
    new CompressionPlugin(),
  ])

  return {
    devtool: debug ? 'sourcemap' : false,
    entry: {
      'main': [
        'babel-polyfill',
        './source/js/handler.js',
      ],
    },
    output: {
      path: path.join(__dirname, debug ? './public/js' : './build/js'),
      filename: debug ? '[name].js' : '[name]-[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: ['transform-regenerator'],
            presets: ['es2015', 'stage-0'],
          }
        }
      ],
    },
    plugins,
  }
}

// So I can run from terminal and from gulp
if(/webpack\.js$/.test(require.main.filename)){
  module.exports = config(debug)
}else{
  module.exports = config
}
