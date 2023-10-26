const gulp = require("gulp")
// HTML
const fileInclude = require('gulp-file-include')
const htmlclean = require('gulp-htmlclean')
const webpHTML = require("gulp-webp-html")

// SCSS
const sass = require("gulp-sass")(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const webpCSS = require("gulp-webp-css")


const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const media = require("gulp-group-css-media-queries")
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const babel = require('gulp-babel')
const webpack = require("webpack-stream")
// IMG
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')


const changed = require('gulp-changed')


gulp.task('clean:docs', function(done) {
	if (fs.existsSync('./docs/')) {
		return gulp.src('./docs/', {
			read: false
		})
		.pipe(clean())
	}
	done()
})

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %=>',
			sound: false,
		})
	}
}

gulp.task('html:docs', function() {
	return gulp.src('./src/*.html')
	.pipe(changed("./docs/"))
	.pipe(plumber(plumberNotify('HTML')))
	.pipe(fileInclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(webpHTML())
	.pipe(htmlclean())
	.pipe(gulp.dest('./docs/'))
})

gulp.task('sass:docs', function() {
	return gulp
	.src('./src/scss/*.scss')
	.pipe(changed("./docs/css/"))
	.pipe(plumber(plumberNotify('SCSS')))
	.pipe(autoprefixer())
	.pipe(webpCSS())
	.pipe(media())
	.pipe(sass())
	.pipe(csso())
	.pipe(gulp.dest('./docs/css'))
})

gulp.task('images:docs', function() {
	return gulp.src('./src/img/**/*')
	.pipe(changed("./docs/img/"))
	.pipe(webp())
	.pipe(gulp.dest("./docs/img/"))
	.pipe(gulp.src('./src/img/**/*'))
	.pipe(imagemin({ verbose: true }))
	.pipe(gulp.dest("./docs/img/"))
})

gulp.task('fonts:docs', function() {
	return gulp.src('./src/fonts/**/*')
	.pipe(changed("./docs/fonts/"))
	.pipe(gulp.dest("./docs/fonts/"))
})

gulp.task('js:docs', function() {
	return gulp.src('./src/js/*.js')
	.pipe(changed("./docs/js/"))
	.pipe(plumber(plumberNotify('JS')))
	.pipe(babel())
	.pipe(webpack(require('./../webpack.config.js')))
	.pipe(gulp.dest('./docs/js'))
})

gulp.task('server:docs', function() {
	return gulp.src('./docs/')
	.pipe(server({
		livereload: true,
		open: true
	}))
})

