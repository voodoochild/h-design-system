var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Build HTML
function html () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
}

// Compile Sass to CSS
function styles () {
  var files = [
    'bower_components/prism/themes/prism.css',
    'src/styles/main.scss'
  ];
  return gulp.src(files)
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({ stream: true }));
}

// Build scripts
function scripts () {
  var files = [
    'bower_components/prism/prism.js',
    'src/scripts/**/*.js'
  ];
  return gulp.src(files)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(reload({ stream: true }));
}

// Execute build tasks
gulp.task('build', function () {
  html();
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
