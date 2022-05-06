import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function(data) {
  if (!data.postsList) {// don't dup into data object
    data.postsList = await client.fetch(groq`
      *[_type == "post" && defined(slug)]{
        title,
        _type,
        'slug': slug.current
      }
    `);
  }
  return data;
}