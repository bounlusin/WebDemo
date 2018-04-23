const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('default', () => {
    gulp.src('./src/app.js')
        .pipe(babel({
            presets: ['env'],
            plugins: ['transform-runtime']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});