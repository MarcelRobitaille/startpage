'use strict'

const $ = require('gulp-load-plugins')()
const process = require('process')
const path = require('path')
const fs = require('fs')

const locals = {
  asset: (file) => {
    const manifest = JSON.parse(fs.readFileSync('./manifest.json'))
    if (process.env.NODE_ENV === 'development') return file

    const filename = path.basename(file)
    const dirname  = path.dirname(file)

    if(!(filename in manifest)){
      console.error(`${file} not found in manifest`)
      return file
    }

    return path.join(dirname, manifest[filename])
  },
}

module.exports = gulp => {
  gulp.task('pug', () => {
    return gulp.src('./source/pug/index.pug')
      .pipe($.pug({ locals }))
      .pipe(gulp.dest(process.env.NODE_ENV === 'development' ? 'public' : 'build'))
  })
}
