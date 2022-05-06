import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function post (data, slug) {
  // utilize all posts if they are loaded...
  let post;
  if (data.posts) {
    post = data.posts.find( post => {
      return post.slug === slug;
    })
    data.post = post;
    return;
  }

  data.post = await client.fetch(groq`
    *[_type == "post" && slug.current == "${slug}"][0] {
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
  console.log('got post', slug);
  console.log(data.post.title)
  return data;
}