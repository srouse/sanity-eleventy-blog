import {
  storyblokGraphQL
} from "../_utils/storyblokClient";
import { Entity } from "../_utils/types";
import { allFragments } from "./fragments";
import state from "./state";

export default async function getEntity(
  slug: string,
): Promise<Entity | undefined> {

  if (state.entities && state.entities[slug]) {
    console.log(`cached: ${slug}`)
    return state.entities[slug];
  }

  const query = {
    query: `query getEntity($id: ID!) {
      PageItem(id: $id) {
        ...page
      }
      NavigationnodeItem(id: $id) {
        ...navigationNode
      }
    }
    ${allFragments.join('\n')}`,
    variables: {
      id: slug
    }
  };
  const results = await storyblokGraphQL(query);

  // find what is THE result and just return that...it has component info in it
  // Otherwise mull results are within PageItem, etc...
  if (results) {
    const values = Object.values(results);
    const result = values.find( value => {
      return value !== null;
    });
    // correct full_slug to not include base folder...
    result.full_slug = slug;
    state.entities[slug] = result;
    return result;
  }
  return undefined;
}
