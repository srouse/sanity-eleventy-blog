import nunjucks from 'nunjucks';
import chalk from 'chalk';
import getRoutes from '../src/routes.mjs';
import {writeFile, mkdir} from 'fs/promises';
import nunjucksUtils from '../src/utils/nunjucksUtils.mjs';
import {ssr} from 'scu-web-components/scripts/ssr.mjs';// Web Comp SSR
import { configImages } from '../src/utils/sanityClient.mjs';
import { configImages as contentfulConfigImages } from '../src/utils/contentfulClient.mjs';

const distFolder = './dist';
const assetsFolder = `${distFolder}/_assets`;

export default async function ssg() {
  console.log(chalk.yellow(`SSG Started`));

  // build data passed to templates
  let data = {
    context: {
      type: 'server'
    }
  };

  // give images access to data
  configImages(data);
  contentfulConfigImages(data);

  // Init Nunjucks
  nunjucksUtils(
    nunjucks.configure(
      './src/_templates/',
      { autoescape: true }
    ),
    data
  );

  // Init routes and build global data...
  const routes = await getRoutes(data);

  // Creating routes...
  await renderPages(data, routes.routes );

  // saving images...
  await cacheImages(data);

  console.log(chalk.cyan(`SSG Done\n`));
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
  const route = standardizeRoute(routeEntry.url);// check for leading slash....
  const routeInfo = routeEntry;//routeEntry[1];

  data.context.route = route;
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

async function cacheImages(data) {
  console.log(chalk.yellow(`\nImage Caching Started`));
  await mkdir(`${assetsFolder}`, { recursive: true });
  const imageEntries = Object.entries(data.context.images);
  const imagePromiseArray = [];
  imageEntries.map(imgInfo => {
    imagePromiseArray.push(new Promise(async (resolve) => {
      const name = imgInfo[0];
      const url = imgInfo[1];
      console.log('caching image', url);
      await fetch(url)
        .then(response => response.arrayBuffer())
        .then(imageBlob => {
          console.log(chalk.gray(`Cached '${assetsFolder}/${name}'`));
          return writeFile(
            `${assetsFolder}/${name}`,
            Buffer.from(imageBlob)
          );
        });
      resolve();
    }));
  });
  return Promise.all(imagePromiseArray).then(() => {
    console.log(chalk.cyan(`Image Cache Done\n`));
  });
}