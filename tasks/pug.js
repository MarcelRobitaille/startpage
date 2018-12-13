const fs = require('fs')
const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()

const locals = {
  asset: (file) => {
    if (process.env.NODE_ENV === 'development') return file

    const manifest = JSON.parse(fs.readFileSync('./manifest.json'))

    const filename = path.basename(file)
    const dirname  = path.dirname(file)

    if(!(filename in manifest)){
      console.error(`${file} not found in manifest`)
      return file
    }

    return path.join(dirname, manifest[filename])
  },
}

const stream = dest => () =>
  gulp.src('./source/pug/index.pug')
    .pipe($.pug({ locals }))
    .pipe(gulp.dest(dest))


gulp.task('pug', stream('public'))

gulp.task('build-pug', gulp.series('set-env', stream('build')))

