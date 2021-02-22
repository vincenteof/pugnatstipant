const gulp = require('gulp')
const babel = require('gulp-babel')

const paths = {
  dest: {
    lib: 'lib', // commonjs
    esm: 'esm', // ES module
    dist: 'dist', // UMD
  },
  scripts: ['src/**/*.{ts,tsx}'],
}

function compileCJS() {
  const { dest, scripts } = paths
  return gulp.src(scripts).pipe(babel()).pipe(gulp.dest(dest.lib))
}

const build = gulp.parallel(compileCJS)

exports.build = build
exports.default = build
