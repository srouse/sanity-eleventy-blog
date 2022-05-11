import getPort from 'get-port';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import cssr from './cssr.mjs';
import ssg from './ssg.mjs';
import esbuild from './esbuild.mjs';

export async function buildAndServe(withSSG = false) {
  if (withSSG) {
    await ssg();
  }
  // ESBuild
  const buildResult = await esbuild(true);
  // CSSR
  await cssr();
  server(buildResult, withSSG);
}

export async function server(buildResult, withSSG) {
  console.log(chalk.yellow(`Creating Dev Server`));

  const browser = browserSync.create();

  const port = await getPort({
    port: 8080 // portNumbers(4000, 4999)
  });

  if (port !== 8080) {
    console.log(chalk.magenta(`Error: couldn't get port 8080 (for Sanity)`));
    return;
  }

  console.log(chalk.cyan(`Launched: http://localhost:${port}\n`));
  
  // Launch browser sync
  browser.init({
    startPath: withSSG ? '/' : '/_preview/?route=/',
    port,
    logLevel: 'silent',
    logPrefix: '[log]',
    logFileChanges: false,
    injectChanges: false,
    notify: false,
    open: false,
    cors: true,
    server: {
      baseDir: './dist',
      directory: false
    }
  });

  browser.watch([// REBUILD
      'src/**',
      'build/**'
    ],{
      // ignored: [// brackets are not accepted, so use arrays
      //   'src/**/+(tests)/*',  // don't watch anything in tests
      //   'src/**/*.ssr.*'      // don't watch generated ssr files
      // ]
    }).on('change', async filename => {
    rebuildAndReload(buildResult, browser, filename, withSSG);// , buildConfig);
  });
}

function rebuildAndReload(buildResult, browser, filename, withSSG) {// , buildConfig) {
  console.log(chalk.yellow(`Rebuilding (${filename})\n`));
  buildResult
      .rebuild()
      .then(() => {
        console.log(chalk.cyan(`Rebuilding Done`));
        return Promise.resolve()
      })
      .then(() => withSSG ? ssg() : Promise.resolve())
      .then(() => cssr())
      .then(() => browser.reload())
      .catch(err => console.error(chalk.red(err)));
}