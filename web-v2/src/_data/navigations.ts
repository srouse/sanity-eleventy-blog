import {
  storyblokGraphQL,
  baseFolder,
  rootNavigationFolder
} from "../_utils/storyblokClient";
import { MappedItems } from "../_utils/types";
import { navigationNodeFragment } from "./fragments";
import state from './state';

export default async function getNavigations(): Promise<MappedItems> {
  if (state.entities[rootNavigationFolder]) {
    return state.entities;
  }

  const query = {
    query: `query getEntities {
      NavigationnodeItems(starts_with: "${baseFolder}/") {
        items {
          ...navigationNode
        }
      }
    }
    ${navigationNodeFragment}`
  };
  const results = await storyblokGraphQL(query);

  if (results) {
    const values = Object.values( results );
    values.map(entities => {
      entities.items.map( item => {
        state.entities[item.full_slug] = item;
      });
    });
  }
  return state.entities;
}
