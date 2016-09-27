'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var nodemon = require('nodemon');
var del = require('del');
var reload = browserSync.reload;

// config
var BASE_DIR = './';
var APP_DIR_RESOURCES = BASE_DIR + 'resources/';
var APP_DIR_APP = APP_DIR_RESOURCES + 'app/';
var APP_DIR_DIST = APP_DIR_RESOURCES + 'dist/';
var APP_DIR_VIEW = BASE_DIR + 'views/';

var config = {
    BASE_DIR : BASE_DIR,
    APP_DIR_RESOURCES : APP_DIR_RESOURCES,
    APP_DIR_APP : APP_DIR_APP,
    APP_DIR_DIST : APP_DIR_DIST,
    APP_DIR_VIEW : APP_DIR_VIEW
};

var files = {
    js : APP_DIR_APP + 'js/**/*.js',
    css : APP_DIR_APP + 'css/**/*.css',
    templates : APP_DIR_APP + 'templates/**/*.hbs',
    view_pc : APP_DIR_VIEW + '**/*.hbs'
};

gulp.task('js', function(){
    console.log('js',files.js);
    //./resources/app/js/**/*.js
    return gulp.src(files.js)
        .pipe(gulp.dest(config.APP_DIR_DIST+'js'));
});

gulp.task('view', function(){
    console.log('view',files.view_pc);
    //./views/**/*.hbs
    return gulp.src(files.view_pc);
});

gulp.task('templates', function(){
    console.log('templates');
    return gulp.src(files.templates)
        .pipe(gulp.dest(config.APP_DIR_DIST+'templates'));
});

gulp.task('css', function(){
    console.log('css');
    return gulp.src(files.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(config.APP_DIR_DIST+'css'));
});

gulp.task('clean', function(){
    console.log('clean');
    return del.sync([config.APP_DIR_DIST]);
});

gulp.task('watch', function(){
    gulp.watch(files.js, ['js','browser-sync']);
    gulp.watch(files.template, ['templates','browser-sync']);
    //gulp.watch(files.view, ['view','browser-sync']);
    gulp.watch(files.view).on('change', reload);
    gulp.watch(files.css, ['css','browser-sync']);
});

gulp.task('browser-sync', ['local_build_pc', 'js'], function() {
    browserSync.init({
        proxy: "http://localhost:3000/homework",
        files: ["resources/**/*.*"],
        port: 3000
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;

    // return nodemon({
    //     script: 'server.js'
    // })
});

// webpack config
var webpackConfig = require('./gulp/webpack.config');
var webpackBuild = require('./gulp/webpack.build');
console.log('webpackConfig = ',webpackConfig('production', 'pc'));
gulp.task('local_build_pc', webpackBuild(webpackConfig('production', 'pc')));


gulp.task('default', ['clean', 'view', 'js', 'templates', 'css', 'browser-sync', 'watch'], function(){
    return gutil.log('Gulp is running');
});
