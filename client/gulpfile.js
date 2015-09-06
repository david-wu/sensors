var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var sourceStream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');

// Compiles js Files
gulp.task('buildJs', function() {
    return browserify('./src/index.js', {
            debug: true,
            transform: [reactify]
        })
        .bundle()
        .pipe(sourceStream('bundle.js'))
        .pipe(gulp.dest('./build'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('./build/test.js'));
});

// Compiles scss files
gulp.task('buildSass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(sass())
        .pipe(concatCss('style.css'))
        .pipe(minifyCss({keepBreaks:true}))
        .pipe(gulp.dest('./build'));
});

// Builds serves, and watches files
gulp.task('default', ['buildJs', 'buildSass', 'watch'], serve);

function serve(){
    connect.server({
        port: 8007,
        livereload: true,
    });
    // gulp.watch(['./src/**'], ['buildSass', 'buildJs', reload]);
}
gulp.task('watch', function(){
    gulp.watch(['./src/**'], ['buildSass', 'buildJs', reload]);
})
function reload(){
    gulp.src('./build/*')
        .pipe(connect.reload());
}
