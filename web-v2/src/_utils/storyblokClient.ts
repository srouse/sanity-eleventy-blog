import StoryblokClient from 'storyblok-js-client';
import config from '../client-config';
import state from '../_data/state';
import { ContextTypes } from './types';

let storyblokClient: StoryblokClient | undefined;

export const baseFolder = 'website';
export const rootNavigationFolder = `website/navigations/main-navigation/`;

export function cleanSlug(slug: string = '') {
  // some StoryBlok nonsense....
  let finalSlug = slug;
  if (finalSlug && finalSlug.indexOf(baseFolder) === 0) {
    finalSlug = finalSlug.substring(baseFolder.length);
  }
  // if (finalSlug.lastIndexOf('/') == finalSlug.length-1) {
  //   finalSlug = finalSlug.substring(0, finalSlug.length-1);
  // }
  return finalSlug;
}

export function slugToUrl(
  slug: string,
  type: ContextTypes | undefined = undefined// overrides state
) {
  let finalUrl = cleanSlug(slug);
  let previewRoute = '';
  
  if (type) {
    if (type === ContextTypes.server) {
      previewRoute = '';
    }else if (type === ContextTypes.browser) {
      previewRoute = '/_preview/?route=';
    }else if (type === ContextTypes.browserDyanamic) {
      previewRoute = '/_dynamic';
    }
  } else {
    if (state.context.type === ContextTypes.browser) {
      previewRoute = '/_preview/?route=';
    }else if (state.context.type === ContextTypes.browserDyanamic) {
      previewRoute = '/_dynamic';
    }
  }
  return `${previewRoute}${finalUrl}`;
}

export function initClient(
  client?: StoryblokClient,
) {
  if (client) {
    storyblokClient = client;
  } else {
    storyblokClient = new StoryblokClient({
      accessToken: config.storyBlokAccessToken,
      cache: {
        clear: "auto",
        type: "memory",
      },
    });
  }
}

export default function getStoryblokClient() {
  if (!storyblokClient) {
    initClient();// init with nothing...
  }
  return storyblokClient;
}

// Node file using this needs to add "import 'isomorphic-fetch';"
export async function storyblokGraphQL(
  query: object
) : Promise<object | undefined> {
  // if (!fetchFunk) return;
  const queryStr = JSON.stringify(query);
  const response = await fetch(
    'https://gapi.storyblok.com/v1/api',
    {
      method: 'post',
      body: queryStr,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': `${queryStr.length}`,
        'Token': config.storyBlokAccessToken,
        'Version': config.storyBlokVersion,
        // 'User-Agent': 'Node',
      },
    }
  ).catch(err => console.error( err ));
  if (response) {
    const json = await response.json();
    return json.data;
  }
  return undefined;
}