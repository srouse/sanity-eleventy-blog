import {exec} from 'child_process';
import chalk from 'chalk';

export default async function cssr() {
  console.log(chalk.yellow(`CSSR Started`));
  // exec(`scw-components css './src/_templates/**/*.njk' './dist/ssr.css'`);
  // dist instead?
  await execShellCommand(`scw-components css './dist/**/*.html' './dist/ssr.css'`);
  console.log(chalk.cyan(`CSSR Done\n`));
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
 function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }