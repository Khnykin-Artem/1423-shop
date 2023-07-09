import fs from 'node:fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = function () {
  const { app } = global;
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

export const ttfToWoff = function () {
  const { app } = global;
  return app.gulp
    .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));
};

export const fontsStyle = function () {
  const { app } = global;
  const callback = (error) => error && console.error(error);
  const fontsFile = `${app.path.srcFolder}/styles/fonts.scss`;

  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (!fontsFiles) return;
    if (!fs.existsSync(fontsFile)) {
      fs.writeFile(fontsFile, '', callback);
      let newFileOnly;
      for (let i = 0; i < fontsFiles.length; i++) {
        const fontFileName = fontsFiles[i].split('.')[0];
        if (newFileOnly !== fontFileName) {
          const fontName = fontFileName.split('-')[0] || fontFileName;
          let fontWeight = fontFileName.split('-')[1] || fontFileName;
          switch (fontWeight.toLowerCase()) {
            case 'thin':
              fontWeight = 100;
              break;
            case 'extralight':
              fontWeight = 200;
              break;
            case 'light':
              fontWeight = 300;
              break;
            case 'medium':
              fontWeight = 500;
              break;
            case 'semibold':
              fontWeight = 600;
              break;
            case 'bold':
              fontWeight = 700;
              break;
            case 'extrabold':
              fontWeight = 800;
              break;
            case 'heavy':
              fontWeight = 800;
              break;
            case 'black':
              fontWeight = 900;
              break;
            default:
              fontWeight = 400;
          }
          fs.appendFile(
            fontsFile,
            `
              @font-face {
                font-family: ${fontName};
                font-display: swap;
                src: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');
                font-weight: ${fontWeight};
                font-style: normal;
              }
            `,
            callback
          );
          newFileOnly = fontFileName;
        }
      }
    } else {
      console.log(
        'Файл styles/fonts.scss уже существует! Для обновления файла нужно его удалить.'
      );
    }
  });
  return app.gulp.src(`${app.path.srcFolder}`);
};
