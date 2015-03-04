// include gulp
var gulp = require('gulp');

// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// path variables
var src = {
	css: [
		'./src/**/*.css'
	],
	html: [
		'./src/**/*.html'
	],
	img: [
		'./src/img/**/*'
	],
	js: [
		// './src/lib.js',
		'./src/**/*.js'
	],
	jsNoLib: [
		// './src/lib.js',
		'./src/!(lib)/*.js'
	]
};
var	dest = {
	css: './build/css',
	html: './build',
	img: './build/img',
	js: './build/js'
};

// minify new images
gulp.task('imagemin', function() {
	gulp.src(src.img)
		.pipe(changed(dest.img))
		.pipe(imagemin())
		.pipe(gulp.dest(dest.img));
});

// minify new or changed HTML pages
gulp.task('html:build', function() {
	gulp.src(src.html)
		.pipe(changed(dest.html))
		.pipe(minifyHTML())
		.pipe(gulp.dest(dest.html));
});

// JS hint task
gulp.task('js:lint', function () {
	gulp.src(src.jsNoLib)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// JS concat, strip, and minify
gulp.task('js:build', function () {
	gulp.src(src.js)
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest(dest.js));
});

// CSS sprite
// gulp.task('css:sprite', function () {
// 	gulp.src(src.css)
// 		.pipe(concat('styles.css'));
// });

// CSS concat, auto-prefix and minify
gulp.task('css:build', function () {
	gulp.src(src.css)
		.pipe(concat('styles.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest(dest.css));
});

// default gulp task
gulp.task('default', ['imagemin', 'html:build', 'js:build', 'css:build'], function () {
	// watch for HTML changes
	gulp.watch(src.html, ['html:build']);

	// watch for JS changes
	gulp.watch(src.js, ['js:lint', 'js:build']);

	// watch for CSS changes
	gulp.watch(src.css, ['css:build']);
});