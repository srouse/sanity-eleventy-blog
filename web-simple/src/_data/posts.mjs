import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function(data) {
  if (!data.posts) {// don't dup into data object
    data.posts = await client.fetch(groq`
      *[_type == "post" && defined(slug)]{
        title,
        'slug': slug.current,
        _type,
        publishedAt,
        mainImage,
        excerpt,
        authors,
        body
      }
    `);
  }
  return data;
}