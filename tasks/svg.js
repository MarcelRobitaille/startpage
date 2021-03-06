const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

gulp.task('svg', () => {
	return gulp.src('source/svg/*.svg')
		.pipe(gulp.dest('public/svg/'))
		.pipe($.svgSprite({
			mode: {
				symbol: {
					dest: 'svg',
					inline: true,
					sprite: 'sprite.svg'
				}
			}
		}))
		.pipe($.rename('sprite.svg'))
		.pipe(gulp.dest('public'))
})

gulp.task('build-svg', () => {

	return gulp.src('source/svg/*.svg')
		.pipe($.svgmin())
		.pipe(gulp.dest('build/svg/'))
		.pipe($.svgSprite({
			mode: {
				symbol: {
					dest: 'svg',
					inline: true,
					sprite: 'sprite.svg'
				}
			}
		}))
		.pipe($.rename('sprite.svg'))
		.pipe(gulp.dest('build'))

})

gulp.task('watch-svg', gulp.series('svg', 'pug'))
