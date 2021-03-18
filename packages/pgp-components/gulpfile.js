const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const through2 = require('through2')

sass.compiler = require('node-sass')

const paths = {
  dest: {
    lib: 'lib', // commonjs
    esm: 'esm', // ES module
    dist: 'dist', // UMD
  },
  styles: 'src/**/*.scss',
  scripts: ['src/**/*.{ts,tsx}'],
}

function compileScripts(babelEnv, destDir) {
  const { scripts } = paths
  process.env.BABEL_ENV = babelEnv
  return gulp
    .src(scripts)
    .pipe(babel())
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone())
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding)
          file.contents = Buffer.from(cssInjection(content))
          file.path = file.path.replace(/index\.js/, 'css.js')
          this.push(file)
          next()
        } else {
          next()
        }
      })
    )
    .pipe(gulp.dest(destDir))
}

function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.scss/g, '.css')
}

function compileCJS() {
  const { dest } = paths
  return compileScripts('cjs', dest.lib)
}

function compileESM() {
  const { dest } = paths
  return compileScripts('esm', dest.esm)
}

function copyScss() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm))
}

function scss2Css() {
  return gulp
    .src(paths.styles)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssnano({ zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm))
}

// todo: rollup for umd build with a full css file

const buildScripts = gulp.series(compileCJS, compileESM)
const build = gulp.parallel(buildScripts, copyScss, scss2Css)

exports.build = build
exports.default = build
