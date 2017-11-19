const gulp       = require('gulp'),
      babel      = require('gulp-babel'),
      sass       = require('gulp-sass'),
      connect    = require('gulp-connect'),
      pug        = require('gulp-pug'),
      sourcemaps = require('gulp-sourcemaps');

const es6files   = ['./src/js/*.es6'],
      htmlfiles  = ['./src/**/*.html'],
      pugfiles  = ['./src/**/*.pug'],
      scssfiles  = ['./src/css/*.scss'];

gulp.task('es6', function() {
    gulp.src(es6files)
        .pipe(babel({ presets: ['env'] }))
        .pipe(gulp.dest('./build/js'));
    });
    
gulp.task('sass', function() {
    gulp.src(scssfiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(htmlfiles)
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

gulp.task('pug', function () {
    gulp.src(pugfiles)
        .pipe(pug({}))
        .pipe(gulp.dest('./build'))
        .pipe(connect.reload());
});

gulp.task('default', function() {    
    gulp.run('es6', 'sass', 'html', 'pug', 'connect');
    gulp.watch(es6files, function(e) {
        gulp.run('es6');
    });
    gulp.watch(scssfiles, function(e) {
        gulp.run('sass');
    });
    gulp.watch(htmlfiles, function (e) {
        gulp.run('html');
    });
    gulp.watch(pugfiles, function (e) {
        gulp.run('pug');
    });
});