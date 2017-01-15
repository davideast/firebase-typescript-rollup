const fs = require('fs');
const insertCss = require('insert-css');
const STYLE_TAG = '<style>';
const CLOSED_STYLE_TAG = '</style>';
const EMBED_REPLACE_TOKEN = /<!-- ::EMBEDDED-STYLES:: -->/;
const cssFiles = [
  './src/css/colors.css',
  './src/css/base.css',
  './src/css/layout.css',
  './src/css/state.css',
  './src/css/clickcircle.css',
  './src/css/imagecover.css',
  './src/css/authorfigure.css'
];
const cssContent = cssFiles.map(file => fs.readFileSync(file).toString('utf8'));
const cssCombined = cssContent.join('\n');
const cssWithStyleTag = [STYLE_TAG, cssCombined, CLOSED_STYLE_TAG];
const styleElement = cssWithStyleTag.join('\n');
const html = fs.readFileSync('./src/index.html').toString('utf8');
const result = html.replace(EMBED_REPLACE_TOKEN, styleElement);

fs.writeFileSync('./public/index.html', result);