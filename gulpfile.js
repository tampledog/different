'use strict';

// gem install sass (for ruby)

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

    var path = {
        build: { //Тут мы укажем куда складывать готовые после сборки файлы
            html: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            img: 'build/images/',
            fonts: 'build/fonts/',
            php:'build/'
        },
        src: { //Пути откуда брать исходники
            html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
            js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
            style: 'src/sass/style.scss',
            img: 'src/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
            fonts: 'src/fonts/**/*.*',
            php:'src/*.php'
        },
        watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            html: 'src/**/*.html',
            js: 'src/js/**/*.js',
            style: 'src/sass/**/*.scss',
            img: 'src/images/**/*.*',
            fonts: 'src/fonts/**/*.*',
            php:'src/*.php'
        },
        clean: './build'
    };

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 3333,
    logPrefix: "basic_frontend"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    return sass(path.src.style)
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['> 0%'],
        cascade: false
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('php:build',function(){
    gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php));
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'php:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:build');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});

// minify functions

gulp.task('css-minify', function() {
    return sass(path.src.style,{
        style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(autoprefixer({
        browsers: ['> 0%'],
        cascade: false
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});

gulp.task('js-minify', function(){

    gulp.src('build/js/main.js')
    .pipe(uglify()) //Сожмем наш js
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));

});

// /minify functions

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('minify', ['css-minify', 'js-minify']);