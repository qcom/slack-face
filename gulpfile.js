var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');

var paths = {
	js: ['./src/**/*.js']
};

function reportError(err) {
	notify({
		title: 'Gulp Task Error',
		message: 'check console'
	}).write(err);
	console.error(err.toString());
	this.emit('end');
}

// lint src/
gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(eslint())
		.pipe(eslint.format());
});

// transpile es2015 -> es5
gulp.task('js', function() {
	return gulp.src(paths.js)
	.pipe(plumber({
		errorHandler: reportError
	}))
	.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('dist'));
});

const defaultTasks = ['lint', 'js'];

gulp.task('default', defaultTasks);

gulp.task('watch', defaultTasks, function() {
	gulp.watch(paths.js, defaultTasks);
});
