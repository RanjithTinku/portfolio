const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const header = require('gulp-header');
const rename = require('gulp-rename');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
  return gulp.src(['src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Watch Sass & Serve
gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['src/scss/*.scss'], gulp.series('sass'));
  gulp.watch("src/*.html").on('change', browserSync.reload);
}));

// Default Task
gulp.task('default', gulp.series('serve'));
