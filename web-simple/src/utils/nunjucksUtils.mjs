import imageUrl from './imageUrl.mjs';
import { router } from "../routes.mjs";

export default function(env, data) {
  // {{ url('home') }}
  // {{ url('post', 'my-post') }}
  env.addGlobal('url', (_type, url) => {
    const isPreview = data.context.type === 'browser';
    let finalUrl = url;
    let previewRoute = isPreview ? '/_preview/?route=' : ''
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

  env.addGlobal("imageUrl", imageUrl);
}