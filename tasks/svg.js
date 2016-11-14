'use strict'

const $ = require('gulp-load-plugins')()

module.exports = gulp => {
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

  gulp.task('build-svg', (cb) => {

    return gulp.src('source/svg/*.svg')
      .pipe($.svgmin())
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

  gulp.watch('./source/svg/*.svg', ['svg'])
}
