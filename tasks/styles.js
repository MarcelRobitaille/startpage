const path = require('path')

const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const sass = require('gulp-sass')(require('sass'))
const sassGraph = require('sass-graph')

const prepend = substring => string => substring + string

const styles = [
	'global',
]

const tasks = []

styles.map(style => {

	const file = `./source/css/${style}.scss`
	const files = Object
		.keys(sassGraph.parseFile(file, { exclude: /node_modules/ }).index)
		.filter(file => !/node_modules/.test(file))

	const task = `css-${style}`
	tasks.push(task)

	gulp.task(`watch-css-${style}`, () =>
		gulp.watch(files)
			.on('all', gulp.series(task)))

	gulp.task(task, () => {
		return gulp.src(file)
			.pipe($.sourcemaps.init())
			.pipe(sass())
			.pipe($.autoprefixer())
			.pipe($.sourcemaps.write('maps/'))
			.pipe(gulp.dest('public/css'))
			.pipe($.if(
				file => path.extname(file.path) === '.css',
				require('browser-sync').stream()
			))
	})

	gulp.task(`build-css-${style}`, () => {
		return gulp.src(file)
			.pipe(sass())
			.pipe($.cssnano())
			.pipe($.autoprefixer())
			.pipe($.rev())
			.pipe($.dbust())
			.pipe(gulp.dest('build/css/'))
			.pipe($.gzip())
			.pipe(gulp.dest('build/css/'))
	})
})

gulp.task('css', gulp.parallel(tasks))
gulp.task('build-css', gulp.parallel(tasks.map(prepend('build-'))))
gulp.task('watch-css', gulp.parallel(tasks.map(prepend('watch-'))))
