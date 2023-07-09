import * as nodePath from 'node:path';

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = './dist';
const srcFolder = './src';

const path = {
  src: {
    html: `${srcFolder}/*.html`,
    styles: `${srcFolder}/styles/style.scss`,
    scripts: `${srcFolder}/scripts/main.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    styles: `${srcFolder}/styles/**/*.scss`,
    scripts: `${srcFolder}/scripts/**/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
  rootFolder,
};

export default path;
