'use strict'

const process = require('process')
const webpack = require('webpack')
const fs      = require('pn/fs')

const debug   = process.env.NODE_ENV !== "production"

function config(debug){
  const plugins = [ new webpack.optimize.CommonsChunkPlugin('main', debug ? 'main.js' : '[name]-[chunkhash].js'), ]

  if(!debug) plugins.push(...[
    removeOld,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    require('dbust').webpack,
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

function removeOld(){
  const manifest = JSON.parse(fs.readFileSync('./manifest.json'))
  const files = Object.keys(manifest)
    .map((key) => manifest[key])
    .filter((file) => file.indexOf('.js', this.length - 3) !== -1)

  files.forEach((file) => fs.unlink(`./public/js/${file}`).catch((err) => { throw err }))
}
