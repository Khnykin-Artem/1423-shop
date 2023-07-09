import autoPrefixer from 'gulp-autoprefixer';
import cleanCss from 'gulp-clean-css';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import rename from 'gulp-rename';
import gulpSass from 'gulp-sass';
import webpCss from 'gulp-webpcss';
import dartSass from 'sass';

const sass = gulpSass(dartSass);

function styles() {
  const { app } = global;
  return (
    app.gulp
      .src(app.path.src.styles, { sourcemaps: app.isDev })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'STYLES',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(app.plugins.replace(/@images\//g, '../images/'))
      .pipe(
        sass({
          outputStyle: 'expanded',
        })
      )
      .pipe(app.plugins.if(app.isBuild, groupCssMediaQueries()))
      .pipe(
        app.plugins.if(
          app.isBuild,
          webpCss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuild,
          autoPrefixer({
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      // Раскомментировать если нужен не сжатый дубль файла стилей
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.if(app.isBuild, cleanCss()))
      .pipe(
        rename({
          extname: '.min.css',
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
}

export default styles;
