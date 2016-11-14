'use strict'

module.exports = gulp => {
  gulp.task('browser-sync', () => {
    require('browser-sync').init({
      proxy: 'http://localhost:8080',
      open: false,
      port: 4000,
      browser: 'google chrome',
      files: [
        'views/**/*.pug',
        'source/**/*.pug',
        'public/**/*.js',
        'public/images/*',
      ],
      ghostMode: false
    })
  })
}
