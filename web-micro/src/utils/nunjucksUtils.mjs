import {router} from '../routing/routes.mjs';
// import {imageUrl as contentfulImageUrl} from './contentfulClient.mjs';
// import {imageUrl} from './sanityClient.mjs';

export default function(env, data) {
  // {{ url('home') }}
  // {{ url('post', 'my-post') }}
  env.addGlobal('url', (_type, url) => {
    if (!_type || !url) return '';
    
    let finalUrl = url;
    let previewRoute = '';
    if (data.context.type === 'browser') {
      previewRoute = '/_preview/?route=';
    }else if (data.context.type === 'browser-dynamic') {
      previewRoute = '/_dynamic';
    }
    if (_type) {
      if (_type === 'direct') {
        previewRoute = '';
      }else{
        const route = router.routeViaId(_type, [url]);
        finalUrl = route.url;
      }
    }
    return `${previewRoute}${finalUrl}`;
  })

  env.addGlobal('rowFillsByIndex', (fills, index) => {
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