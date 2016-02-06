'use strict';

var gulp = 	require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create();;

gulp.task("concatScripts", function() {
	return gulp.src([
		'js/flickity.pkgd.min.js', 
		'js/app.js'
	])
	.pipe(maps.init())
	.pipe(concat("site.js"))
	.pipe(maps.write('./'))
	.pipe(gulp.dest("js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	return gulp.src("js/site.js")
		.pipe(uglify())
		.pipe(rename('site.min.js'))
		.pipe(gulp.dest('js'))
});

gulp.task("compileSass", function() {
	return gulp.src("scss/style.scss")
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task("watchFiles", function() {
	gulp.watch('scss/**/*.scss', ['compileSass']);
	gulp.watch('js/app.js', ['concatScripts']);
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('serve', ['watchFiles', 'browser-sync']);

gulp.task("build", ['minifyScripts', 'compileSass']);

gulp.task("default", ["build"]);