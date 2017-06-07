'use strict'

const $    = require('gulp-load-plugins')()
const path = require('path')

const styles  = {
  'global.scss': {
    files: [
      './node_modules/normalize.css/normalize.css',
      'source/css/global.scss',
      'source/css/_components.scss',
      'source/css/_vars.scss',
      'source/css/_base.scss',
    ],
  },

}

module.exports = (gulp) => {
  Object.keys(styles).forEach(mainFile => {

    gulp.task(mainFile, () => {
      return gulp.src('./source/css/' + mainFile)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/css'))
        .pipe($.if(
          file => path.extname(file.path) === '.css',
          require('browser-sync').stream()
        ))
    })

    gulp.task('build-' + mainFile, () => {
      return gulp.src('./source/css/' + mainFile)
        .pipe($.sass())
        .pipe($.cssnano())
        .pipe($.autoprefixer())
        .pipe($.rev())
        .pipe($.dbust())
        .pipe(gulp.dest('build/css/'))
        .pipe($.gzip())
        .pipe(gulp.dest('build/css/'))
    })

    gulp.task('watch-' + mainFile, () => {
      gulp.watch(styles[mainFile].files, [mainFile])
    })
  })

  gulp.task('css', Object.keys(styles))
}
