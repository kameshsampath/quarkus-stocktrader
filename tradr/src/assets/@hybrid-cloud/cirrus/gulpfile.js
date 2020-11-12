/* jshint globalstrict: true */
/* globals require */
/* globals console */
'use strict';

const gulp = require('gulp');

// Core
const clone = require('gulp-clone');
const del = require('del');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const spy = require('gulp-spy');
const merge = require('merge-stream');
const path = require('path');
const runSequence = require('run-sequence');
const filter = require('through2-filter').obj;

// JS
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglifym = require('gulp-uglify/minifier');
const uglifyh = require('uglify-js-harmony');
const wrap = require("gulp-wrap");
const order = require("gulp-order");
var uglify = (opts) => uglifym(opts, uglifyh);  // support ES2015

// Images
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');

// Styles
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const scssLint = require('gulp-scss-lint');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');


// Folder Paths
const dist = './dist/';
const src = './src/';


const trace = false;  // set true to trace build pipelines


// Clean
gulp.task('clean', () =>
  del([
    path.join(dist, '**/*'),
  ])
);


// Images
gulp.task('images', () =>
  gulp.src(path.join(src, 'images/**/*'))
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(spy({ log: trace, prefix: 'images:' }))
    .pipe(gulp.dest(path.join(dist, 'images/')))
);

// SVG Sprite
const spriteConfig = {
  mode: {
    symbol: {
      render: {
        css: false,
        scss: false
      },
      dest: 'icons',
      prefix: '.icon--%s',
      sprite: 'sprite.svg'
    }
  }
};

gulp.task('icons', () =>
  gulp.src(path.join(src, 'icons/**/*.svg'))
    .pipe(spy({ log: trace, prefix: 'icons in:' }))
    .pipe(svgSprite(spriteConfig))
    .pipe(spy({ log: trace, prefix: 'icons out:' }))
    .pipe(gulp.dest(dist))
);


// Sass
gulp.task('styles', () => {
  gulp.src(path.join(src, 'scss/**/*.scss'))
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(scssLint())
    .pipe(sourcemaps.init())
    .pipe(sass({includePaths: ['node_modules']}))
    .pipe(postcss([
      autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']})
    ]))
    .pipe(sourcemaps.write('../maps', { sourceRoot: null }))
    .pipe(spy({ log: trace, prefix: 'styles (uncompressed):' }))
    .pipe(gulp.dest(path.join(dist, 'css/')))
    .pipe(filter(chunk => !chunk.path.endsWith('.map')))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(spy({ log: trace, prefix: 'styles:' }))
    .pipe(gulp.dest(path.join(dist, 'css/')));
});


// Javascript
gulp.task('scripts', () => {
  let source = gulp.src(path.join(src, 'js/**/*.js'))
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.plugin + ': ' + error.message + ', line ' + error.lineNumber);
        this.emit('end');
    }}))
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter('default'))
    .pipe(sourcemaps.init())
    .pipe(order(['js/util.js', 'js/*.js'], { base: src }))
    .pipe(spy({ prefix: 'scripts (input):' }))
    .pipe(concat('cirrus.js'))
    .pipe(wrap('(() => {<%= contents %>})();'));

  let uncompressed = merge(
    source,
    source.pipe(clone())
      .pipe(rename({ suffix: '.es5' }))
      .pipe(babel({ presets: ['es2015'] }))
  );

  let output = merge(
    uncompressed,
    uncompressed.pipe(clone())
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
  );

  return output
    .pipe(sourcemaps.write('../maps'))
    .pipe(spy({ log: trace, prefix: 'scripts (output):' }))
    .pipe(gulp.dest(path.join(dist, 'js/')));
});

gulp.task('gulpfile', () =>
  // physician, heal thyself
  gulp.src('gulpfile.js')
    .pipe(jshint({esnext: true}))
    .pipe(jshint.reporter('default')));


// Fonts
gulp.task('fonts', () =>
  gulp.src('./node_modules/@design/fonts/fonts/**/*')
    .pipe(spy({ log: trace, prefix: 'fonts:' }))
    .pipe(gulp.dest(path.join(dist, 'fonts/')))
);


// Default
gulp.task('default', () => {
  gulp.watch(path.join(src, 'scss/**/*.scss'), ['styles']);
  gulp.watch(path.join(src, 'js/**/*.js'), ['scripts']);
  gulp.watch(path.join(src, 'images/**/*'), ['images']);
  gulp.watch(path.join(src, 'icons/**/*'), ['icons']);
});


// Build
gulp.task('build', (cb) =>
  runSequence(
    'clean',
    ['fonts', 'styles', 'scripts', 'images', 'icons'],
    cb
  )
);


// Prepare SVGs
const svgminConfig = {
  plugins: [{
    removeAttrs: { attrs: 'svg:id' }
  },
  {
    removeStyleElement: true
  },
  {
    addClassesToSVGElement: { className: 'icon' }
  }]
}

gulp.task('prepareSvg', () =>
  gulp.src(path.join(src, 'icons/**/*.svg'))
    .pipe(spy({ log: trace, prefix: 'icons in:' }))
    .pipe(svgmin(svgminConfig))
    .pipe(spy({ log: trace, prefix: 'icons out:' }))
    .pipe(gulp.dest(src + 'icons/'))
);
