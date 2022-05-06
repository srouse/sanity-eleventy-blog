import routeLookup from "./routeLookup.mjs";

export default function(env, data) {
  // {{ url('home') }}
  // {{ url('post', 'my-post') }}
  env.addGlobal('url', (_type, slug) => {
    const isPreview = data.context.type === 'browser';
    let finalSlug = slug;
    if (_type) {
      finalSlug = routeLookup(_type, slug);
    }
    return `${isPreview ? '/_preview/?route=' : ''}${finalSlug}`;
  })
}