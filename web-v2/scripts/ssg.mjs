import chalk from 'chalk';
import {writeFile, mkdir} from 'fs/promises';
import 'isomorphic-fetch';
import state from '../dist/_data/state.js';
import getEntities from '../dist/_data/entities.js';
import { executeAll } from '../dist/_templates/templateEngine.js';
import { cleanSlug } from '../dist/_utils/storyblokClient.js';

const distFolder = './dist';
// const assetsFolder = `${distFolder}/_assets`;

export default async function ssg() {
  console.log(chalk.yellow(`SSG Started`));

  // build data passed to templates
  state.context.type = 'server';

  await getEntities();
  const entitiesHtml = await executeAll(state.entities);
  await renderEntity(entitiesHtml);
  // await getData();
  // const result = await nunjucks.render('index.njk', state);

  console.log(chalk.cyan(`SSG Done\n`));
}

async function renderEntity(entitiesHtml) {
  if (entitiesHtml.length > 0) {
    const entity = entitiesHtml.shift();
    const entityFolder = `${distFolder}${cleanSlug(entity.slug)}`;
    // Make folder
    await mkdir(entityFolder, { recursive: true });
    // Write to Folder
    console.log(chalk.gray(`Created '${entityFolder}/index.html'`));
    await writeFile(`${entityFolder}/index.html`, entity.html);
    return renderEntity(entitiesHtml);
  }
  return true;
}
