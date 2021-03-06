const rollup = require('rollup');
const fs = require('fs');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const psize = require('pretty-size');
const gzipSize = require('gzip-size');

rollup.rollup({
  entry: 'dist/index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}).then((bundle) => {
  const result = bundle.generate({
    format: 'umd',
    moduleName: 'app'
  });

  return bundle.write({
    format: 'umd',
    dest: 'public/index.js',
    moduleName: 'app'
  });
}).then(_ => {
  const file = fs.readFileSync('public/index.js');
  const bytes = gzipSize.sync(file);
  console.log(`firebase.app & firebase.storage: ${psize(bytes, true)} gzipped`);
});
