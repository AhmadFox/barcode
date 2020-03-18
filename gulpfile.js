var gulp = require('gulp'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	image = require('gulp-image'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	minifyCSS = require('gulp-csso'),
	minifyJS = require('gulp-minify'),
	connect = require('gulp-connect'),
	sourceMaps = require('gulp-sourcemaps'),
	nunjucksRender = require('gulp-nunjucks-render');

// -- gulp tasks for watch and build for one time
// build html pages and components
gulp.task('nunjucks', function() {
	// Gets .html and .nunjucks files in pages
	return gulp.src('app/views/pages/**/*.+(html|nunjucks)')
	// Renders template with nunjucks
	.pipe(nunjucksRender({
		path: ['app/views']
	}))
	// output files in app folder
	.pipe(gulp.dest('public'))
	.pipe(connect.reload());
});

// combile images
gulp.task('image', function () {
	gulp.src('app/image/**/*')
		.pipe(gulp.dest('public/image'))
		.pipe(connect.reload());
});

// combile fonts
gulp.task('font', function () {
	gulp.src('app/sass/fonts/')
		.pipe(gulp.dest('public/css/fonts'))
		.pipe(connect.reload());
});
 
// build css pages
gulp.task('sass', function () {
	return gulp.src('app/sass/**/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(sourceMaps.init())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('public/css'))
		.pipe(connect.reload());
});

// build js pages
gulp.task('js', function(){
	return gulp.src('app/js/*.js')
		.pipe(sourceMaps.init())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('public/js'))
		.pipe(connect.reload());
});

// build js pages
gulp.task('lib', function(){
	return gulp.src('app/libs/**/*')
		.pipe(sourceMaps.init())
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('public/libs'))
		.pipe(connect.reload());
});

// build and minify css and fontsbit
gulp.task('cssMinify', function () {
	return gulp.src('public/css/**.css')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('build/css'));
});

// build js pages
gulp.task('jsMinify', function(){
	return gulp.src('public/js/**/*.js')
		.pipe(minifyJS({
			ext:{
				src:'.js',
				min:'.min.js'
			},
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js']
		}))
		.pipe(gulp.dest('build/js'));
});

// export and compress images
gulp.task('imageCompress', function () {
	gulp.src('public/image/**/*')
		.pipe(image({
			svgo: true,
			quiet: true,
			optipng: true,
			mozjpeg: true,
			guetzli: true,
			gifsicle: true,
			pngquant: true,
			concurrent: 10,
			zopflipng: true,
			jpegRecompress: true
		}))
		.pipe(gulp.dest('build/image'));
});

// -- connect local server --
gulp.task('connect', function() {
	connect.server({
		root: './public',
		livereload: true,
		port: 3000
	});
});
// -- watch function --
// for reload browser and only bulid for changed files
gulp.task('watch', function () {
	gulp.watch('app/views/**/*.html', ['nunjucks']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/image/*', ['image']);
	gulp.watch('app/sass/fonts/fonts/', ['font']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/libs/**/*.libs', ['libs']);
});


// gulp build for one time
gulp.task('default', [ 'nunjucks', 'sass', 'font', 'js', 'image', 'lib' ]);

// gulp build and watch -- run project --
gulp.task('run', [ 'nunjucks', 'sass', 'font', 'js', 'image', 'lib', 'watch', 'connect' ]);

// gulp minified and compress all files
gulp.task('production', [ 'nunjucks', 'cssMinify', 'font', 'jsMinify', 'lib', 'imageCompress' ]);