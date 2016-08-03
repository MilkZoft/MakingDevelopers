import { $baseUrl } from './src/lib/config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import nodemon from 'gulp-nodemon';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import mocha from 'gulp-mocha';
import remoteSrc from 'gulp-remote-src';
import jsonFormat from 'gulp-json-format';
import concat from 'gulp-concat';

// Vendor task
gulp.task('vendor', () => {
  return gulp.src([
    './src/public/bower_components/jquery/dist/jquery.min.js',
    './src/public/js/vendors/ckeditor/basepath.js',
    './src/public/bower_components/ckeditor/ckeditor.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./src/public/js/'));
});

// All task
gulp.task('all', () => {
  return gulp.src([
    './src/public/js/dashboard/main.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./src/public/js/'));
});

// Content task
gulp.task('content', () => {
  remoteSrc(['en.json', 'es.json'], {
    base: `${$baseUrl('development')}/content/`
  })
  .pipe(jsonFormat(2))
  .pipe(gulp.dest('./src/content/i18n/'));
});

// Mocha task
gulp.task('test', () => {
  return gulp.src([
    'test/**/*Test.js'
  ])
  .pipe(mocha());
});

// Linter task
gulp.task('analyze', () => {
  return gulp.src([
    'src/**/*.js',
    'test/**/*Test.js',
    '!src/public/bower_components/**/*.js',
    '!src/public/js/vendors/**/*.js',
    '!src/public/js/vendor.js',
    '!src/public/js/all.js'
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

// Stylus task
gulp.task('stylus', () => {
  return gulp.src('src/stylus/style.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(livereload())
    .pipe(gulp.dest('src/public/css'));
});

gulp.task('livereload', () => {
  livereload({ start: true });
});

gulp.task('start-dev', () => {
  livereload.listen();

  gulp.watch('src/stylus/*.styl', ['stylus']);

  nodemon({
    script: 'src/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', () => {
    gulp.src('src/server.js')
      .pipe(livereload())
      .pipe(notify('Reloading page, please wait...'));
  });
});

// Start production
gulp.task('start', () => {
  nodemon({
    script: 'src/server.js',
    ext: 'js',
    env: {
      'NODE_ENV': 'production'
    }
  });
});

gulp.task('default', ['livereload', 'start-dev']);
