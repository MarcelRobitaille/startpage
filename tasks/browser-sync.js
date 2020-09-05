const gulp = require('gulp')
const bs = require('browser-sync').create('startpage')

gulp.task('browser-sync', () => {
	bs.init({
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
