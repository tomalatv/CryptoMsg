var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('*/*.js').on('change', browserSync.reload);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('*.css').on('change', browserSync.reload);
    gulp.watch('*.js').on('change', browserSync.reload);
});

// gulp.task('watch', function() {
//     gulp.watch('**/*.js', ['browser-sync']);
//     gulp.watch('**/*.html', ['browser-sync']);
//     gulp.watch('*.js', ['browser-sync']);
//     gulp.watch('*.css', ['browser-sync']);
// });

gulp.task('default', ['browser-sync']);