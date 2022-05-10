import groq from 'groq';
import client from '../utils/sanityClient.mjs';

export default async function homePage(data) {
  if (!data.homePage) {
    const filter = groq`*[_type == "page" && _id == "frontpage"]`
    const projection = groq`[0]{
      title,
      'slug': slug.current,
      publishedAt,
      content[]{
        _type == 'rowLayoutObject' => @{
          rowLayout[]-> {
            title,
            _type,
            body,
            'excerpt': excerpt[0].children[0].text,
            mainImage
          }
        },
      }
    }`
    const query = [filter, projection].join(' ')
    const homePage = await client.fetch(query).catch(err => console.error(err))
    data.homePage = homePage;
  }
}

