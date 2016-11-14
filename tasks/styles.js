'use strict'

const $    = require('gulp-load-plugins')()
const path = require('path')
const fs   = require('pn/fs')
const co   = require('co')

const styles  = {
  'global.scss': {
    files: [
      './node_modules/normalize.css/normalize.css',
      'source/css/global.scss',
      'source/css/_components.scss',
      'source/css/_vars.scss',
      'source/css/_base.scss',
    ],
    dir: 'css/'
  },

}

module.exports = gulp => {
  Object.keys(styles).forEach(mainFile => {

    gulp.task(mainFile, () => {
      return gulp.src('./source/' + styles[mainFile].dir + mainFile)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write('maps/'))
        .pipe(gulp.dest('public/' + styles[mainFile].dir))
        .pipe($.if(
          file => path.extname(file.path) === '.css',
          require('browser-sync').stream()
        ))
    })

    gulp.task('build-' + mainFile, (cb) => {
      co(function*(){
        const file = yield fs.readFile('./manifest.json')
        const json = JSON.parse(file)
        if(mainFile.replace('scss', 'css') in json) fs.unlink(`./public/css/${json[mainFile.replace('scss', 'css')]}`)

        gulp.src('./source/' + styles[mainFile].dir + mainFile)
          .pipe($.sass())
          .pipe($.cssnano())
          .pipe($.autoprefixer())
          .pipe($.rev())
          .pipe(require('dbust').gulp())
          .pipe(gulp.dest('public/' + styles[mainFile].dir))
          .on('end', cb)

      }).catch((err) => { throw err })
    })

    gulp.task('watch-' + mainFile, () => {
      gulp.watch(styles[mainFile].files, [mainFile])
    })
  })

  gulp.task('css', Object.keys(styles))
}
