'use strict'

const newer		 = require('gulp-newer')
const imagemin	= require('gulp-imagemin')
const jpegoptim = require('imagemin-jpegoptim')

module.exports = gulp => {
	gulp.task('images', () => {
		gulp.watch('./source/images/**', ['images'])
		return gulp.src('./source/img/**')
			.pipe(newer('./public/img/'))
			.pipe(imagemin([
				jpegoptim({ progressive: true, max: 75 }),
				imagemin.svgo(),
			], { progressive: true }))
			.pipe(gulp.dest('./public/img/'))
	})

	gulp.task('build-images', () => {
		return gulp.src('./source/img/**')
			.pipe(newer('./public/img/'))
			.pipe(imagemin([
				jpegoptim({ progressive: true, max: 75 }),
				imagemin.svgo(),
			], { progressive: true }))
			.pipe(gulp.dest('./build/img/'))
	})
}
