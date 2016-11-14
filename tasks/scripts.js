'use strict'

const _             = require('lodash')
const util          = require('gulp-util')
const process       = require('process')
const webpack       = require('webpack')
const webpackConfig = require('../webpack.config.js')

const parsedConfig = {
  debug: webpackConfig(true),
  prod: webpackConfig(false)
}

function webpackHandler(cb){
  return function(err, stats){
    if(err) throw new util.pluginError('webpack', err)
    cb()
  }
}

const files = _.flatten(_.values(parsedConfig.debug.entry))

module.exports = (gulp) => {
  gulp.task('js', (cb) => webpack(parsedConfig.debug, webpackHandler(cb)) )

  gulp.task('build-js', (cb) => webpack(parsedConfig.prod, webpackHandler(cb)) )

  gulp.task('watch-js', () => {
    gulp.watch(files, ['js'])
  })
}
