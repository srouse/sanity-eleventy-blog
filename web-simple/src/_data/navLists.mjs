import groq from 'groq';
import client from '../utils/sanityClient.mjs';

/* export default async function(data) {
  if (!data.metadata) {// don't dup into data object
    data.metadata = await client.fetch(groq`
      *[_id == "siteSettings"]{
        ...,
        author->
      }[0]
    `);
  }
  return data;
} */

export default async function navLists(data) {
  if (!data.navLists) {
    const main = await getNavLists('main');
    const footer = await getNavLists('footer');
    const utility = await getNavLists('utility');
    data.navLists = {
      main,
      footer,
      utility
    }
  }
}

async function getNavLists (id) {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "navList" && menuId == "${id}"]`
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
  }`;
  const query = [filter, projection].join(' ');
  const docs = await client.fetch(query).catch(err => console.error(err));
  return ( docs && docs.length > 0 ) ? docs[0] : null;
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
