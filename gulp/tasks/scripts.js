import webpackStream from 'webpack-stream';

function scripts() {
  const { app } = global;
  return app.gulp
    .src(app.path.src.scripts, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'SCRIPTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpackStream({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'main.min.js',
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
}

export default scripts;
