import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function(data) {
  if (!data.pages) {// don't dup into data object
    data.pages = await client.fetch(groq`
      *[_type == "page" && defined(slug)]{
        title,
        'slug': slug.current,
        _type,
        publishedAt,
        content[]->
      }
    `);
  }
  return data;
}