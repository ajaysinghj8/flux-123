var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    plumber = require('gulp-plumber'),
    babelify = require('babelify'),
    concat = require('gulp-concat'),
    _ = require('lodash'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence');



gulp.task('default', ['webserver', 'build-application']);
gulp.task('webserver', function() {
    return connect.server({
        livereload: true
    });
})
gulp.task('build-application', function() {
    return gulp.src('./src/AppBootstrap.js')
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            debug: true,
            transform: ['babelify']
        }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./public/js'));

});

gulp.watch(['./src/**/*.js'], function() {
    runSequence(['build-application', 'reload-connect']);
});
gulp.task('reload-connect', function() {
    gulp.src('./src/**/*.js').pipe(plumber()).pipe(connect.reload());
});
