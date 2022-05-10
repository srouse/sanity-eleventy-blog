import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function(data) {
  if (!data.pagesList) {// don't dup into data object
    data.pagesList = await client.fetch(groq`
      *[_type == "page" && defined(slug)]{
        title,
        _type,
        'slug': slug.current
      }
    `);
  }
  return data;
}