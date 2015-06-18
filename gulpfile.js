/**
 * Created by Administrator on 2015/6/18.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var zip = require('gulp-zip');
var rename = require('gulp-rename');

var paths = {
    minscripts: ['./public/javascripts/jquery-1.9.1.min.js'],
    scripts: ['./public/javascripts/list.js', './public/javascripts/product.js'],
    styles: ['./public/styles/*'],
    images: './public/images/**',
    zip: ['**',
        '.gitignore',
        '!test.js','!test_new.js',
        '!log/**','!log',
        '!test/**','!test',
        '!node_modules/**','!node_modules',
        '!public/images/**','!public/images',
        '!public/javascripts/**','!public/javascripts',
        '!public/styles/**','!public/styles',
        '!gulpfile.js']
};
//'./bin/*','./biz/*','./public/build/*','./router/*','./views/*','!./test','!./.idea','!./node_modules'

gulp.task('clean', function(cb) {
    // You can use multiple globbing patterns as you would with `gulp.src`
    del(['./public/build'], cb);
});
gulp.task('clean archive', function(cb) {
    del(['./dist'], cb);
});

gulp.task('Uglify JS Files', ['clean'],  function(){
    return gulp.src(paths.scripts).
        pipe(uglify()).
        pipe(rename({suffix: '.min'})).
        pipe(gulp.dest('./public/build/js/')).
        pipe(concat('scripts.min.js')).
        pipe(gulp.dest('./public/build/js/'));
});
gulp.task('Copy min JS Files', ['clean'],  function(){
    return gulp.src(paths.minscripts).
        pipe(gulp.dest('./public/build/js/'));
});
gulp.task('Check Js Files', function(){
    return gulp.src(paths.scripts).
        pipe(jshint()).
        pipe(jshint.reporter('default'));
});
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        .pipe(imagemin({
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./public/build/images'));
});
gulp.task('styles', ['clean'], function () {
    return gulp.src(paths.styles).
        pipe(minifyCss({compatibility: 'ie8'})).
        pipe(rename({suffix: '.min'})).
        pipe(gulp.dest('./public/build/css')).
        pipe(concat('styles.min.js')).
        pipe(gulp.dest('./public/build/css'));
});

gulp.task('zip', ['clean archive','Uglify JS Files','Copy min JS Files','images','styles'], function () {
    return gulp.src(paths.zip)
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));
});
//'Uglify JS Files'
gulp.task('default',['zip','Check Js Files']);
