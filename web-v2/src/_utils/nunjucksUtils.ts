// import {router} from '../routing/routes.mjs';
// import {imageUrl as contentfulImageUrl} from './contentfulClient.mjs';
// import {imageUrl} from './sanityClient.mjs';
import { State } from './types';

export default function(
  env,
  state: State
) {

  env.addGlobal('url', (
    _type: string,
    url: string
  ) => {
    if (!_type || !url) return '';
    
    let finalUrl = url;
    let previewRoute = '';
    if (state.context.type === 'browser') {
      previewRoute = '/_preview/?route=';
    }else if (state.context.type === 'browser-dynamic') {
      previewRoute = '/_dynamic';
    }
    /* if (_type) {
      if (_type === 'direct') {
        previewRoute = '';
      }else{
        const route = router.routeViaId(_type, [url]);
        finalUrl = route.url;
      }
    } */
    return `${previewRoute}${finalUrl}`;
  })

  env.addGlobal('rowFillsByIndex', (
    fills: string,
    index: number
  ) => {
    const fillsArray = fills.split(',');
    if (fillsArray.length > index) {
      return parseInt( fillsArray[index] );
    }
    return 1;
  });

  // env.addGlobal("imageUrl", imageUrl);
  // env.addGlobal("contentfulImageUrl", contentfulImageUrl);

  // I know...but it's just so easy to use there
  env.addGlobal("log", (...args) => { console.log(...args) });
}