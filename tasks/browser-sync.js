'use strict'

module.exports = gulp => {
  gulp.task('browser-sync', () => {
    require('browser-sync').init({
      server: { baseDir: './public/' },
      open: false,
      port: 4000,
      browser: 'firefox',
      files: [
        'source/**/*.pug',
        'public/**/*.js',
        'public/images/*',
      ],
      ghostMode: false
    })
  })
}
