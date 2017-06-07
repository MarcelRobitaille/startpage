'use strict'

const fs = require('pn/fs')
const del = require('del')
const gulp = require('gulp-autoplumb')
const runSequence = require('run-sequence')
const process = require('process')
const dbust = require('dbust')

dbust.options({ base: __dirname })

fs.readdirSync('./tasks/')
  .filter(file => /\.js$/.test(file))
  .forEach(file => {
    require('./tasks/' + file)(gulp)
  })


gulp.task('default', ['css', 'js', 'svg', 'watch', 'pug', 'browser-sync'])

gulp.task('set-env', () => process.env.NODE_ENV = 'production')
gulp.task('clean', () => del('./build/'))
gulp.task('dbust', dbust.save)

gulp.task('build', done => {
  runSequence(
    ['set-env', 'clean'],
    Object.keys(gulp.tasks).filter( task => /build-.*/gi.test(task) ),
    'dbust',
    'pug',
    done
  )
})

gulp.task('watch', Object.keys(gulp.tasks).filter(task => {
  return /watch-.*/gi.test(task)
}), () => {
  gulp.watch(['./manifest.json', './source/pug/*', './source/svg/*'], ['pug'])
})
