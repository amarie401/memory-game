"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cached = require('gulp-cached');

gulp.task('sass', function() { // named our task 'sass'
    return gulp.src('./src/styles/**/*.scss') // listen to any files inside of this src directory
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./lib/styles/')); // compile down into main.css
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js') // look for anything with a .js extension
        .pipe(babel({ // function that is an object
            presets: ['es2015']
        }))
        // .pipe(uglify()) // *** WE CAN COMMENT THIS OUT UNTIL PRODUCTION SO WE CAN SEE BROWSER ERRORS BETTER
        .pipe(gulp.dest('./lib/js/')); // can change to scripts if you name your folder scripts instead of js

    gulp.src(['./src/js/vendor/jquery-3.1.1.min.js', './src/js/vendor/moment.js']) // minify vendor files
        .pipe(cached('vendor-processing')) // the first time we run and it will process the vendor profiles and define the cache, will make things run quicker
        .pipe(uglify())
        .pipe(concat('vendor.min.js')) 
        .pipe(gulp.dest('./lib/js/vendor'));
});

// gulp.task('img', function() {
//     gulp.src('./src/styles/images/')
//     .pipe(gulp.dest('./lib/styles/images'));
// });

gulp.task('watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/js/*.js', ['js']);
    // gulp.watch('./src/styles/images/', ['img']);
});

// gulp.task('default', ['sass', 'watch']); // the default behavior // alternative
gulp.task('default', ['watch']); // the default behavior
