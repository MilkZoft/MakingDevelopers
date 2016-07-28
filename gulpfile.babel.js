import $config from './src/lib/config';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import livereload from 'gulp-livereload';
import nodemon from 'gulp-nodemon';
import notify from 'gulp-notify';
import stylus from 'gulp-stylus';
import mocha from 'gulp-mocha';
import remoteSrc from 'gulp-remote-src';
import jsonFormat from 'gulp-json-format';

// Content task
gulp.task('content', function() {
  remoteSrc(['en.json', 'es.json'], {
    base: `${$config('development').baseUrl}/content/`
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
    'test/**/*.js',
    '!src/public/bower_components/**/*.js'
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
