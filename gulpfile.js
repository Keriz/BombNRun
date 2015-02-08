var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');

var gulp = require('gulp');
var watch = require('gulp-watch')
var jade = require('gulp-jade');
var stylus = require('gulp-stylus')
var nib = require('nib')

var production = process.env.NODE_ENV === 'production';

gulp.task('js', bundle); // so you can run `gulp js` to build the file
gulp.task('dev', ['js'], function() {
  //jade no sourcemaps
  watch('public/*.jade', function(event){console.log('File ' + event.path + ' was ' + event.event + ', running jade task');})
    .pipe(jade())
    .pipe(gulp.dest('./public/'));

  //stylus no sourcemaps
  watch('public/stylesheets/*.styl', function(event){console.log('File ' + event.path + ' was ' + event.event + ', running stylus task');})
    .pipe(stylus({use: nib()}))
    .pipe(gulp.dest('./public/stylesheets/'));

});

gulp.task('prod', function(){
  gulp.src('./public/stylesheets/*.styl')
    .pipe(stylus({use: nib()}))
    .pipe(gulp.dest('./build/public/stylesheets'));
  gulp.src('./public/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/public/'));
   gulp.src('./app.js')
    .pipe(gulp.dest('./build/'));
   gulp.src('./package.json')
    .pipe(gulp.dest('./build/'));
  browserify('./client/main.js')
  .bundle()
  //Pass desired output filename to vinyl-source-stream
  .pipe(source('client.js'))
  // Start piping stream to tasks!
  .pipe(gulp.dest('./build/public/'));
  browserify('./server/main.js')
  .bundle()
  //Pass desired output filename to vinyl-source-stream
  .pipe(source('server.js'))
  // Start piping stream to tasks!
  .pipe(gulp.dest('./build/'));
});


var bundler = watchify(browserify('./client/main.js', watchify.args));

bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('client.js'))
    .pipe(gulp.dest('./public/'));
}