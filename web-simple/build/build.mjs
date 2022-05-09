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

  // init nunjucks
  nunjucksUtils( nunjucks.configure('./src/_templates/', { autoescape: true }), data );

  // init routes and build global data...
  const routes = await getRoutes(data);

  console.log( ssr);
  // walk through creating routes...
  const routeEntries = Object.entries(routes.routes);
  const promises = routeEntries.map( async routeEntry => {
    const route = standardizeRoute(routeEntry[0]);// check for leading slash....
    data.context.route = route;
    const routeInfo = routeEntry[1];
    if (routeInfo.template) {
      if (routeInfo.data) {
        await routeInfo.data(data);
      }
      // Nunjucks Processing
      const result = nunjucks.render(routeInfo.template, data);
      // SSR Web Components
      const ssrResult = await ssr(result);
      // Make folder
      await mkdir(`${distFolder}${route}`, { recursive: true })
      // Write to Folder
      return writeFile(`${distFolder}${route}/index.html`, ssrResult);
    }
    console.error(`template not found: ${route}`);
  })
  await Promise.all(promises);
  
  // CSSR
  console.log(chalk.gray(`Building CSSR`));
  exec(`scw-components css './src/_templates/**/*.njk' './dist/ssr.css'`);

  // now build javascript in package...
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

run();