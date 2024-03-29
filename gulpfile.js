var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var nano        = require('gulp-cssnano');
var maps        = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var imageResize = require('gulp-image-resize');
var plumber = require('gulp-plumber');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( 'bundle' , ['exec', 'jekyll', 'build', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('images', function() {
    gulp.src('img/drizzle.jpeg')
    .pipe(imageResize({
        width: 2880,
        height: 1800,
        upscale:false
    }))
    .pipe(rename(function(path){
        path.basename += "-min";
    }))
    .pipe(gulp.dest('./img'))
})

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'js', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('css/main.scss')
        .pipe(maps.init())
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['_sass']
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        // .pipe(nano())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('_site/css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

/**
 * Compile files from js into both _site/js (for live injecting) and site (for future jekyll builds)
 */
gulp.task('js', function () {
    return gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('_site/js'))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.scss', ['sass']);
    gulp.watch('css/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js'], ['jekyll-rebuild']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
