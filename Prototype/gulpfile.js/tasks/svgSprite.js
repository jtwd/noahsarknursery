var config      = require('../config')
if(!config.tasks.svgSprite) return

var browserSync = require('browser-sync')
var gulp        = require('gulp')
var imagemin    = require('gulp-imagemin')
var svgstore    = require('gulp-svgstore')
var inject      = require('gulp-inject')
var rename      = require('gulp-rename')
var path        = require('path')

var svgSpriteTask = function() {

  var settings = {
    src: path.join(config.root.src, config.tasks.svgSprite.src, '/*.svg'),
    dest: path.join(config.root.dest, config.tasks.svgSprite.dest),
    htmlDest: path.join(config.root.dest, '/*.html')
  }

  var svgs = gulp.src(settings.src)
    .pipe(imagemin())
    .pipe(rename({prefix: 'ico-'}))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(gulp.dest(settings.dest))
    .pipe(browserSync.stream());

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp.src(settings.htmlDest)
    .pipe(inject(svgs, { transform: fileContents}))
    .pipe(gulp.dest(settings.htmlDest))

}

gulp.task('svgSprite', svgSpriteTask)
module.exports = svgSpriteTask
