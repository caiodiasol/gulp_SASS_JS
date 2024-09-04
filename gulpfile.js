// Importando pacote do gulp 
const gulp = require('gulp');
// Importando pacote do Gulp-SASS (Gulp-sass: integra o SASS com Gulp ;SASS: é quem faz a compilaçao de todo pacote)
const sass = require('gulp-sass')(require('sass'));
// Importando pacote do SouceMaps
const sourcemaps = require('gulp-sourcemaps');
// Importando pacote do Uglify
const unglify = require('gulp-uglify');
// Importando pacote do Obfuscate
const obfuscate = require('gulp-obfuscate');
// Importando pacote do imagemin que comprime imagens atraves do gulp
const imagemin = require('gulp-imagemin');

function comprimeImagem(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
    .pipe(unglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}


exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('../source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeImagem));
}


