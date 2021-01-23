const { argv } = require('process');
const { build } = require('esbuild');
const path = require('path');

const options = {
  define: { 'process.env.NODE_ENV': process.env.NODE_ENV },
  entryPoints: [path.resolve(__dirname, 'src/Index.js')],
  minify: argv[2] === 'production',
  bundle: true,
  target: 'es2016',
  platform: 'browser',
  sourcemap: true,
  loader: { '.js': 'jsx' },
  outfile: 'dist/bundle.js',
};

build(options).catch(err => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
