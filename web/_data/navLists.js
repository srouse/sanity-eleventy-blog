// const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
// const serializers = require('../utils/serializers')
// const overlayDrafts = require('../utils/overlayDrafts')
// const hasToken = !!client.config().token

async function getNavLists () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "navList"]`
  const navAttrs = groq`
    _id,
    title,
    link->{
      _type,
      title,
      'slug': slug.current
    },
    _type,
    'slug': slug.current,`;
  const pageRef = pageRefRecursive(navAttrs, '', 0);
  const projection = groq`{
    ${navAttrs}
    ${pageRef}
  }`
  const query = [filter, projection].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  return docs
}

// some recursive magic...
function pageRefRecursive(navAttrs, content, iteration) {
  if (iteration > 3) {
    return _pageRefRecursive( navAttrs, content );
  }else{
    return pageRefRecursive(
      navAttrs,
      _pageRefRecursive( navAttrs, content ),
      iteration+1
    );
  }
}

function _pageRefRecursive(navAttrs, content) {
  return groq`
    children[]{
      _ref != null => @->{
        ${navAttrs}
        ${content}
      },
      _ref == null => @{
        ${navAttrs}
        ${content}
      }
    }`;
}

module.exports = getNavLists