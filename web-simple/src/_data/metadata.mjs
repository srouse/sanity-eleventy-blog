import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function(data) {
  if (!data.metadata) {// don't dup into data object
    data.metadata = await client.fetch(groq`
      *[_id == "siteSettings"]{
        ...,
        author->
      }[0]
    `);
  }
  return data;
}