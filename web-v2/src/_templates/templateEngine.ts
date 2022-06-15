import { Entity, TemplateEngineResult } from "../_utils/types";
import state from "../_data/state";
import { cleanSlug } from "../_utils/storyblokClient";

export const html = String.raw;

export async function execute(
  entity: Entity
) : Promise<string> {
  if (entity) {
    const templateName = entity.content.component;
    let template: ()=> Promise<string>;
    switch( templateName) {
      case 'page' :
        template = (await import('./page.tplt')).default;
        break;
      case 'navigationNode' :
        template = (await import('./navigationNode.tplt')).default;
        break;
      default :
        template = (await import('./error.tplt')).default;
        break;
    }
    if (template) {
      // TODO: insert web component ssr here...
      state.page = entity;
      state.context.route = cleanSlug(entity.full_slug);
      return template();
    }
    return '';
  }
}

export async function executeAll(
  entities: Entity[]
) : Promise<TemplateEngineResult[]> {
  let results: TemplateEngineResult[] = [];
  const promiseAll = [];
  if (entities) {
    const entries = Object.entries(entities);
    results = await _executeAll(entries);
  }
  return Promise.all(promiseAll).then(() => results);
}

async function _executeAll(
  entities: [string, Entity][],
  results: TemplateEngineResult[] = []
) {
  if (entities.length > 0) {
    const entity = entities.shift();
    const slug = entity[0];
    const content = entity[1]; 
    const html = await execute(content);
    results.push({
      slug,
      html,
    });
    return _executeAll(entities, results);
  }
  return results;
}