import path from 'path';
import chalk from 'chalk';
import glob from "glob-promise";
import esbuildOrig from "esbuild";
// import { sassPlugin } from 'esbuild-sass-plugin';
import copy from 'esbuild-plugin-copy';

export default async function esbuild (
  incremental = false,
  // config = {sassIncludePaths:[]}
) {
  console.log('compiling and bundling typscript web comps (esbuild)');
  // collecting ts files to be processed
  const entryFiles = await glob(path.resolve('./src/**/!(*.test).mjs'));// assume the root


  // esbuild them...
  const buildResult = await esbuildOrig.build({
    format: "esm",
    target: "es2019",// optional chaining out...
    entryPoints: entryFiles,
    bundle: true,
    minify: true,
    sourcemap: true,
    splitting: true,
    chunkNames: 'chunks/[name].[hash]',
    incremental,
    define: {
      // Popper.js expects this to be set
      'process.env.NODE_ENV': '"production"'
    },
    outdir: './dist/',
    plugins: [
      /*sassPlugin({
        type: "lit-css",
        includePaths: config.sassIncludePaths,
        importer: null
      }),*/
      copy.default({
        assets: {
          from: ['./node_modules/nunjucks/browser/*'],
          to: ['./_js/nunjucks/browser/*'],
        }
      }),
      copy.default({
        assets: {
          from: ['./src/_preview/index.html'],
          to: ['./_preview/index.html'],
        }
      }),
      copy.default({
        assets: {
          from: ['./src/favicon.ico'],
          to: ['./favicon.ico'],
        }
      }),
      copy.default({
        assets: {
          from: ['./src/**/*.njk'],
          to: ['./'],
          keepStructure: true,
        }
      })
    ]
  })
  .catch(err => {
    console.error(chalk.red(err));
    process.exit(1);
  });
  
  console.log(chalk.cyan('done bundling and compiling typscript\n'));

  return buildResult;
};