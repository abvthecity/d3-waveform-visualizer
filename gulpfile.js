var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var rename = require('gulp-rename');

gulp.task('bundle', function () {
  return browserify('src/d3-waveform.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(rename('d3-waveform.js'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['bundle'], function () {
  gulp.watch('./src/**/*.js', ['bundle']);
});

gulp.task('default', ['bundle']);
