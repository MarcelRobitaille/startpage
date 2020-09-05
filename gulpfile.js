const del = require('del')
const gulp = require('gulp')
const glob = require('glob')
const dbust = require('dbust')
const process = require('process')

dbust.options({ base: __dirname })

gulp.task('set-env', done => {
	process.env.NODE_ENV = 'production'
	done()
})

glob.sync('./tasks/*.js').map(require)

gulp.task('watch', gulp.parallel(
	'watch-css',
	'watch-svg'
))

gulp.task('default', gulp.series(
	gulp.parallel('css', 'js', 'svg', 'watch', 'browser-sync'),
	'pug'
))

gulp.task('set-env', () => process.env.NODE_ENV = 'production')
gulp.task('clean', () => del('./build/'))
gulp.task('dbust', dbust.save)

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('build-css', 'build-js', 'build-svg'),
	'dbust',
	'build-pug'
))
