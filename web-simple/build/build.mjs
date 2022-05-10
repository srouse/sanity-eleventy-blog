import ssg from './ssg.mjs';
import esbuild from './esbuild.mjs';
import cssr from './cssr.mjs';
import chalk from 'chalk';

export default async function build(incremental = false) {
  console.log(chalk.yellow(`Build Started\n`));
  const start = new Date();

  // SSG
  await ssg();

  // Package Javascript
  const buildResult = await esbuild(incremental);

  // Build CSSR (only those atoms used)
  await cssr();

  const end = new Date();
  console.log(chalk.green(`Build Done (${(end.getTime()-start.getTime())/1000}s)`));

  return buildResult;
}
