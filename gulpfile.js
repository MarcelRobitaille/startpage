'use strict'

const fs   = require('fs')
const gulp = require('gulp')

fs.readdirSync('./tasks/').forEach(file => {
  require('./tasks/' + file)(gulp)
})


gulp.task('default', ['css', 'js', 'svg', 'watch', 'browser-sync'])

const buildTasks = Object.keys(gulp.tasks).filter( task => /build-.*/gi.test(task) )

gulp.task('build', buildTasks)

gulp.task('watch', Object.keys(gulp.tasks).filter(task => {
  return /watch-.*/gi.test(task)
}))
