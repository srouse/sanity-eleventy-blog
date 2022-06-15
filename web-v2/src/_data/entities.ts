import {
  storyblokGraphQL,
  baseFolder
} from "../_utils/storyblokClient";
import { MappedItems } from "../_utils/types";
import { allFragments } from "./fragments";
import state from './state';

export default async function getEntities(): Promise<MappedItems> {
  const query = {
    query: `query getEntities {
      PageItems(starts_with: "${baseFolder}/") {
        items {
          ...page
        }
      }
      NavigationnodeItems(starts_with: "${baseFolder}/") {
        items {
          ...navigationNode
        }
      }
    }
    ${allFragments.join('\n')}`
  };
  const results = await storyblokGraphQL(query);

  if (results) {
    const values = Object.values( results );
    values.map(entities => {
      entities.items.map( item => {
        // take out root folder from slug...
        state.entities[item.full_slug] = item;
      });
    });
  }
  return state.entities;
}
