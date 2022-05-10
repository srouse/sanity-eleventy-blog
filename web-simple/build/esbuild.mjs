import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import glob from "glob-promise";
import esbuildOrig from "esbuild";
// import { sassPlugin } from 'esbuild-sass-plugin';
import copy from 'esbuild-plugin-copy';

export default async function esbuild (
  incremental = false
  // config = {sassIncludePaths:[]}
) {
  console.log(chalk.yellow('ESBuild Started'));
  // collecting ts files to be processed
  const entryFiles = await glob(path.resolve('./src/**/!(*.test).mjs'));// assume the root

  const plugins = buildPlugins();

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
    plugins
  })
  .catch(err => {
    console.error(chalk.red(err));
    process.exit(1);
  });
  
  console.log(chalk.cyan('ESBuild Done\n'));

  return buildResult;
};

function buildPlugins() {// incremental = false) {
  const plugins = [
    /* sassPlugin({
      type: "lit-css",
      includePaths: config.sassIncludePaths,
      importer: null
    }), */
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
  ];

  const dsys = '_js/scu-web-components/dist/';
  const dsysDest = `${path.resolve()}/dist/${dsys}`;
  if (!fs.existsSync(dsysDest)) {
    plugins.push(
      copy.default({
        assets: {
          from: ['./node_modules/scu-web-components/dist/**/*'],
          to: [`./${dsys}`],
          keepStructure: true,
        }
      })
    )
  }

  const nunjucks = '_js/nunjucks/browser/';
  const nunjucksDest = `${path.resolve()}/dist/${nunjucks}`;
  if (!fs.existsSync(nunjucksDest)) {
    plugins.push(
      copy.default({
        assets: {
          from: ['./node_modules/nunjucks/browser/*'],
          to: [`./${nunjucks}`],
          keepStructure: true,
        }
      })
    )
  }

  return plugins;
}