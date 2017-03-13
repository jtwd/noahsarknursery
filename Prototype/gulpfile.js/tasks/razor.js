var config = require('../config')
if(!config.tasks.razor) return

var browserSync  = require('browser-sync')
var gulp = require('gulp')
var data = require('gulp-data')
var gulpif = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var razor = require('gulp-razor-tmpl')
var path = require('path')
var htmlmin = require('gulp-htmlmin')
var htmlhint = require('gulp-htmlhint')


var exclude = path.normalize('!**/{' + config.tasks.razor.excludeFolders.join(',') + '}/**')

var paths = {
  src: [path.join(config.root.src, config.tasks.razor.src, '/**/*.{' + config.tasks.razor.extensions + '}'), exclude],
  dataSrc: path.join(config.root.src, config.tasks.razor.dataSrc),
  dest: path.join(config.root.dest, config.tasks.razor.dest)
}

//var appData = require(paths.dataSrc + '/index.json');

var razorTask = function () {
  return gulp.src(paths.src)
    .pipe(razor())
    .on('error', handleErrors)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulpif(global.production, htmlmin(config.tasks.razor.htmlmin)))
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('razor', razorTask)

module.exports = razorTask