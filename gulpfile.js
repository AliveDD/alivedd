'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// production
// var gzip = require('gulp-gzip');
// var runSequence = require('run-sequence');

// angular
// var templateCache = require('gulp-angular-templatecache');
// var ngAnnotate = require('gulp-ng-annotate');

// scripts
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');

// styles
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');

var jeet = require('node-jeet-sass').includePaths;
var normalize = require('node-normalize-scss').includePaths
var sass = require('gulp-sass');





// paths
var Root = './';
var appRoot = Root + 'app/';
//var staticRoot = 'static/';

var config = {
    'dist': {
        'root': Root
    },
    //'gzip': {
        //'src': staticRoot + '**/*.{html,css,js,css.map,js.map}',
        //'dest': staticRoot
    //},
    'templates' : {
        'src' : appRoot + '*.html'
        //'src' : appRoot + '**/*.html',
        //'dest': appRoot + 'scripts/app/'
    },
    'scripts' : {
        'src' : appRoot + 'scripts/*.js'
        //'src' : appRoot + 'scripts/app/**/*.js',
        //'dest': Root + 'static/'
    },
    'styles' : {
        'src' : appRoot + 'styles/main.sass',
        'watch': appRoot + 'styles/**/*',
        'dest': Root + 'static/',
    }
}



//gulp.task('gzip', function() {
    //return gulp.src(config.gzip.src)
        //.pipe(gzip({}))
        //.pipe(gulp.dest(config.gzip.dest));
//});



//gulp.task('templates', function () {
    //return gulp.src(config.templates.src)
        //.pipe(templateCache({
            //standalone: true
        //}))
        //.pipe(gulp.dest(config.templates.dest))

        //.pipe(browserSync.stream({
            //once: true
        //}))
//});



//gulp.task('scripts', function () {
    //return gulp.src(config.scripts.src)
        //.pipe(concat('main.js'))
        //.pipe(ngAnnotate())
        //.pipe(uglify())
        //.pipe(gulp.dest(config.scripts.dest))

        //.pipe(browserSync.stream({
            //once: true
        //}))
//});



gulp.task('styles', function() {
    var processors = [
        autoprefixer({browsers: ['last 3 versions', '> 1%', 'ie 9']}),
        mqpacker({
            sort: true
        }),
        csswring({
            preserveHacks: true,
            removeAllComments: true
        })
    ];
    return gulp.src(config.styles.src)
        .pipe(sass({includePaths: [].concat(
                normalize,
                jeet
            )})
            .on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.styles.dest))
        .pipe(browserSync.stream({
            once: true
        }));
});



gulp.task('sync', ['styles'], function() {
//gulp.task('sync', ['templates', 'scripts', 'styles'], function() {
    browserSync.init({
        server: config.dist.root,
        open: false,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        notify: false,
        logLevel: 'info'
    });

    gulp.watch(config.templates.src).on('change', browserSync.reload);
    gulp.watch(config.scripts.src).on('change', browserSync.reload);
    //gulp.watch(config.templates.src, ['templates']);
    //gulp.watch(config.scripts.src, ['scripts']);
    gulp.watch(config.styles.watch, ['styles']);
});

gulp.task('default', ['sync']);

gulp.task('prod', function() {
    //runSequence(['templates', 'styles', 'scripts'], 'gzip');
    console.log('Production task already completed!');
});