'use strict'

const path = require('path')
const load = (file) => require(path.join(__dirname, file))

const chalk = require('chalk')
const webpack = require('webpack')

const webpackConfig = load('../webpack.config.js')

const parsedConfig = {
  debug: webpackConfig(true),
  prod: webpackConfig(false)
}

function webpackHandler(cb){
  return function(err, stats){
    const errors = stats.compilation.errors
    if(errors.length){
      const err = errors[0].error
      console.log()
      console.error(chalk.red.bold(err.message))
      console.error(chalk.red(err.stack))
      console.log()
    }
    cb()
  }
}

module.exports = (gulp) => {
  gulp.task('js', (cb) => webpack(parsedConfig.debug, webpackHandler(cb)))

  gulp.task('build-js', (cb) => webpack(parsedConfig.prod, webpackHandler(cb)) )

  gulp.task('watch-js', () => {
    gulp.watch('./source/**/*.js', ['js'])
  })
}
