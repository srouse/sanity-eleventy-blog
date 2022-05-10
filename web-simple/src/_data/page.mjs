import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function page (data, slug) {
  // utilize all pages if they are loaded...
  let page;
  if (data.pages) {
    page = data.pages.find( page => {
      return page.slug === slug;
    })
    data.page = page;
    return;
  }

  data.page = await client.fetch(groq`
    *[_type == "page" && slug.current == "${slug}"][0] {
      title,
      'slug': slug.current,
      _type,
      publishedAt,
      content[]->
    }
  `);

  return data;
}