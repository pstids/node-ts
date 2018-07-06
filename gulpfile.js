var gulp = require("gulp");
var ts = require("gulp-typescript");
var tslint = require('gulp-tslint');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;

var tsProject = ts.createProject("tsconfig.json");

function ts_lint() {
	return gulp.src(['./**/*.ts', '!./**/*.d.ts', '!./node_modules/**/*'])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
}

function ts_compile() {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: './' }))
        .pipe(gulp.dest(tsProject.options.outDir));
}

var ts = gulp.parallel(ts_lint, ts_compile);


exports.watch = gulp.series(ts, () => {
    // Watch all typescript files
    gulp.watch(['./**/*.ts', '!./node_modules/**/*'], ts);  
});

exports.build = gulp.series(ts);
exports.default = exports.build;