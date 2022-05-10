import routeLookup from "./routeLookup.mjs";

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
        finalUrl = routeLookup(_type, url);
      }
    }
    return `${previewRoute}${finalUrl}`;
  })
}