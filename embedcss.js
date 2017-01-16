const fs = require('fs');
const csso = require('csso');
const psize = require('pretty-size');
const gzipSize = require('gzip-size');

const STYLE_TAG = '<style>';
const CLOSED_STYLE_TAG = '</style>';
const EMBED_REPLACE_TOKEN = /<!-- ::EMBEDDED-STYLES:: -->/;
const cssFiles = [
  './src/css/colors.css',
  './src/css/base.css',
  './src/css/layout.css',
  './src/css/state.css',
  './src/css/clickcircle.css',
  './src/css/imagefigure.css',
  './src/css/prismbasic.css',
];

const cssContent = cssFiles.map(file => fs.readFileSync(file).toString('utf8'));
const cssCombined = cssContent.join('\n');
const compressedCss = csso.minify(cssCombined).css;
const cssWithStyleTag = [STYLE_TAG, compressedCss, CLOSED_STYLE_TAG];
const styleElement = cssWithStyleTag.join('\n');
const html = fs.readFileSync('./src/index.html').toString('utf8');
const result = html.replace(EMBED_REPLACE_TOKEN, styleElement);

fs.writeFileSync('./public/index.html', result);

// Get size
const cssBytes = cssCombined.length;
const compressedBytes = gzipSize.sync(compressedCss);
const htmlBytes = gzipSize.sync(result);

console.log(`CSS  : ${psize(cssBytes, true)} non gzipped`);
console.log(`CSS  : ${psize(compressedBytes, true)} gzipped`);
console.log(`--------------------------------`);
console.log(`HTML : ${psize(htmlBytes, true)} gzipped`);

