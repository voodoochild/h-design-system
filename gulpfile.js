var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Build HTML
function html () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
}

// Move custom fonts
function fonts () {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
    .pipe(reload({ stream: true }));
}

// Compile Sass to CSS
function styles () {
  var files = [
    'bower_components/prism/themes/prism.css',
    'src/styles/main.scss',
  ];
  return gulp.src(files)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({ stream: true }));
}

// Build scripts
// @TODO Split this out into two tasks so that base.js isn't rebuilt unnecessarily.
function scripts () {
  var baseFiles = [
    'node_modules/gulp-babel/node_modules/babel-core/browser-polyfill.min.js',
    'bower_components/jquery/dist/jquery.min.js',
  ];

  gulp.src(baseFiles)
    .pipe(concat('base.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({ stream: true }));

  gulp.src('src/scripts/**/*.js')
    .pipe(babel())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({ stream: true }));
}

// Execute build tasks
gulp.task('build', function () {
  html();
  fonts();
  styles();
  scripts();
});

// Initialise BrowserSync and setup watches
gulp.task('server', ['build'], function () {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch('src/index.html', html);
  gulp.watch('src/styles/**/*.scss', styles);
  gulp.watch('src/scripts/**/*.js', scripts);
});

// Default task
gulp.task('default', ['server']);
