var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var sherpa   = require('style-sherpa');
var clean = require('gulp-clean');

// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/public/**/*',
    '!src/public/{!img,js,scss}/**/*'
  ],
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src/'
  ],
  javascript: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/js/foundation.core.js',
    'bower_components/foundation-sites/js/foundation.util.*.js',
    // Paths to individual JS components defined below
    'bower_components/foundation-sites/js/foundation.abide.js',
    'bower_components/foundation-sites/js/foundation.accordion.js',
    'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    'bower_components/foundation-sites/js/foundation.drilldown.js',
    'bower_components/foundation-sites/js/foundation.dropdown.js',
    'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    'bower_components/foundation-sites/js/foundation.equalizer.js',
    'bower_components/foundation-sites/js/foundation.interchange.js',
    'bower_components/foundation-sites/js/foundation.magellan.js',
    'bower_components/foundation-sites/js/foundation.offcanvas.js',
    'bower_components/foundation-sites/js/foundation.orbit.js',
    'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    'bower_components/foundation-sites/js/foundation.reveal.js',
    'bower_components/foundation-sites/js/foundation.slider.js',
    'bower_components/foundation-sites/js/foundation.sticky.js',
    'bower_components/foundation-sites/js/foundation.tabs.js',
    'bower_components/foundation-sites/js/foundation.toggler.js',
    'bower_components/foundation-sites/js/foundation.tooltip.js',
    'src/public/js/**/*.js',
    'src/public/js/app.js'
  ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  // rimraf('dist/assets', done);
  // rimraf('dist/views', done);
  
  return gulp.src(['dist'], {read: false})
    .pipe(clean());
  // return gulp.src(['dist/app', 'dist/public/assets'], {read: false})
  //   .pipe(clean());
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  // gulp.src(PATHS.assets)
  //   .pipe(gulp.dest('dist/assets'));

  gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('dist'));

  gulp.src(['src/cache/**/*'])
    .pipe(gulp.dest('dist/cache'));

  gulp.src(['src/app/**/*'])
    .pipe(gulp.dest('dist/app'));

  
  gulp.src(['src/public/*.php', 'src/public/.htaccess'])
    .pipe(gulp.dest('dist/public'));
  
  gulp.src(['src/public/fonts/*'])
    .pipe(gulp.dest('dist/public/fonts'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp.src('src/pages/**/*.{phtml,hbs,handlebars}')
    // .pipe(panini({
    //   root: 'src/pages/',
    //   layouts: 'src/layouts/',
    //   partials: 'src/partials/',
    //   data: 'src/data/',
    //   helpers: 'src/helpers/'
    // }))
    .pipe(gulp.dest('./dist/app/views'));
});

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});

// gulp.task('styleguide', function(cb) {
//   sherpa('src/styleguide/index.md', {
//     output: 'dist/styleguide.html',
//     template: 'src/styleguide/template.html'
//   }, cb);
// });


gulp.task('pre-process', ['sass','scss'], function(){});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('scss', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('^meta\..*'),
      new RegExp('^\.is-.*')
    ]
  }));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/public/scss/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/public/css'));
});

gulp.task('sass', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('^meta\..*'),
      new RegExp('^\.is-.*')
    ]
  }));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/public/sass/*.sass')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/public/css'));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/public/js'));
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('src/public/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/public/img'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['pre-process', 'javascript', 'images', 'copy'], done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  // browser.init({
  //   server: 'dist', port: PORT
  // });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch([
    'src/app/**/*.{phtml,volt,php}',
    'src/app/*.{phtml,volt,php}', 
    'src/app/views/**/*.{phtml,volt,php}',
    'src/app/views/*.{phtml,volt,php}'
    ],
    ['build', browser.reload]);
  // gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/public/scss/**/*.scss'], ['pre-process', browser.reload]);
  gulp.watch(['src/public/sass/**/*.sass'], ['pre-process', browser.reload]);
  gulp.watch(['src/public/js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch(['src/public/img/**/*'], ['images', browser.reload]);
  // gulp.watch(['src/styleguide/**'], ['styleguide', browser.reload]);
});
