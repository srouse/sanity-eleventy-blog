import nunjucks from 'nunjucks';
import chalk from 'chalk';
import getRoutes from '../src/routes.mjs';
import esbuild from './esbuild.mjs';
import {writeFile, mkdir} from 'fs/promises';
import nunjucksUtils from '../src/utils/nunjucksUtils.mjs';
import {exec} from 'child_process';
import {ssr} from 'scu-web-components/scripts/ssr.mjs';

const distFolder = './dist';

async function run() {
  const start = new Date();

  // build data passed to templates
  let data = {
    context: {
      type: 'server'
    }
  };

  // Init nunjucks
  nunjucksUtils( nunjucks.configure('./src/_templates/', { autoescape: true }), data );

  // Init routes and build global data...
  const routes = await getRoutes(data);

  // Creating routes...
  const routeEntries = Object.entries(routes.routes);
  await renderPages(data, routeEntries);

  // CSSR
  console.log(chalk.gray(`Building CSSR`));
  exec(`scw-components css './src/_templates/**/*.njk' './dist/ssr.css'`);
  console.log(chalk.cyan(`Building CSSR Done`));

  // Package Javascript
  await esbuild();

  const end = new Date();
  console.log(chalk.green(`done (${(end.getTime()-start.getTime())/1000}s)`));
}

function standardizeRoute(route) {
  let routeFinal = route;
  // should have leading and trailing slash...
  if (routeFinal.indexOf('/') === -1) {
    routeFinal = `/${route}`;
  }
  if (routeFinal.lastIndexOf('/') !== routeFinal.length-1) {
    routeFinal = `${route}/`;
  }
  return routeFinal;
}

async function renderPages(data, routeEntries) {
  if (routeEntries.length > 0) {
    await renderPage(data, routeEntries.shift());
    return await renderPages(data, routeEntries);
  }
  return true;
}

async function renderPage(data, routeEntry) {
  const route = standardizeRoute(routeEntry[0]);// check for leading slash....
  data.context.route = route;
  const routeInfo = routeEntry[1];
  if (routeInfo.template) {
    if (routeInfo.data) {
      await routeInfo.data(data);
    }
    // Nunjucks Processing
    const result = await nunjucks.render(routeInfo.template, data);
    // SSR Web Components
    const ssrResult = await ssr(result);
    // Make folder
    await mkdir(`${distFolder}${route}`, { recursive: true })
    // Write to Folder
    console.log(chalk.gray(`Created '${distFolder}${route}index.html'`));
    return writeFile(`${distFolder}${route}index.html`, ssrResult);
  }
  console.error(`template not found: ${route}`);
}

run();