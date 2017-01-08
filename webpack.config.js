'use strict'

const process = require('process')
const webpack = require('webpack')

const CompressionPlugin = require('compression-webpack-plugin')

const debug   = process.env.NODE_ENV !== "production"

function config(debug){
  const plugins = [ new webpack.optimize.CommonsChunkPlugin('main', debug ? 'main.js' : '[name]-[chunkhash].js'), ]

  if(!debug) plugins.push(...[
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    require('dbust').webpack,
    new CompressionPlugin(),
  ])

  return {
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
      'main': [
        'babel-polyfill',
        './source/js/shortcuts.js',
        './source/js/shortcuts.underline.js',
        './source/js/shortcuts.focus.js',
        './source/js/shortcuts.actions.js',
        './source/js/shortcuts.handler.js',
        './source/js/_search.js',
        './functions/_.js',
      ],
    },
    output: {
      path: './public/js',
      filename: debug ? '[name].js' : '[name]-[chunkhash].js'
    },
    module: debug ? {} : {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
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
