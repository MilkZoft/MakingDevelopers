// NPM Dependencies
import { exec } from 'child_process';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import notify from 'gulp-notify';
import mocha from 'gulp-mocha';
import remoteSrc from 'gulp-remote-src';
import jsonFormat from 'gulp-json-format';
import concat from 'gulp-concat';
import runSequence from 'run-sequence';

// Configuration
import { $baseUrl } from './src/lib/config';

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
    './src/public/js/dashboard/main.js',
    './src/public/js/dashboard/events.js',
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

// Start Redis
gulp.task('start-redis', () => {
  exec('redis-server', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (err !== null) {
      console.log(err);
    }
  });
});

// Start dev task
gulp.task('start-dev', () => {
  nodemon({
    script: 'src/server',
    ext: 'js',
    ignore: [
      'src/public/js/all.js',
      'src/public/js/vendor.js'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  })
  .on('restart', () => {
    gulp
      .src('src/server')
      .pipe(notify('Reloading page, please wait...'));
  });
});

// Start production
gulp.task('start', () => {
  nodemon({
    script: 'src/server',
    ext: 'js',
    env: {
      'NODE_ENV': 'production'
    }
  });
});

gulp.task('init', () => {
  setTimeout(() => {
    try {
      runSequence('vendor', 'all', 'content');
    } catch (e) {
      console.log(e);
    }
  }, 11000);
});

// Default task
gulp.task('default', ['start-dev', 'init', 'start-redis']);
