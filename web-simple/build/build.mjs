import nunjucks from 'nunjucks';
import getRoutes from '../src/routes.mjs';
import esbuild from './esbuild.mjs';
import {writeFile, mkdir} from 'fs/promises';
import nunjucksUtils from '../src/utils/nunjucksUtils.mjs';
// import fs from 'fs';

const distFolder = './dist';

async function run() {
  const routes = await getRoutes();
  // build global data...

  // walk through creating routes...
  const routeEntries = Object.entries(routes.routes);
  // build data
  let data = {
    context: {
      type: 'server'
    }
  };
  await routes.data(data);
  
  // init nunjucks
  nunjucksUtils( nunjucks.configure('./src/', { autoescape: true }), data );

  // run all the pages
  const promises = routeEntries.map( async routeEntry => {
    const route = standardizeRoute(routeEntry[0]);// check for leading slash....
    data.context.route = route;
    const routeInfo = routeEntry[1];
    if (routeInfo.template) {
      if (routeInfo.data) {
        await routeInfo.data(data);
      }
      const result = nunjucks.render(routeInfo.template, data);

      // add web component ssr...

      await mkdir(`${distFolder}${route}`, { recursive: true })
      return writeFile(`${distFolder}${route}/index.html`, result);
    }
    console.error(`template not found: ${route}`);
  })
  await Promise.all(promises);

  // now build javascript in package...
  esbuild();
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