import routeLookup from "./routeLookup.mjs";

export default function(env, data) {
  env.addFilter('url', function(slug, _type) {
    const isPreview = data.context.type === 'browser';
    let finalSlug = slug;
    if (_type) {
      finalSlug = routeLookup(_type, slug);
    }
    return `${isPreview ? '/_preview/?route=' : ''}${finalSlug}`;
  });
}