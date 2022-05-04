const groq = require('groq')
const client = require('../utils/sanityClient.js')

async function getHomePage () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "page" && _id == "frontpage"]`
  const projection = groq`[0]{
    title,
    'slug': slug.current,
    publishedAt,
    content[]{
      _type == 'rowLayoutObject' => @{
        rowLayout[]-> {
          title,
          body,
          'excerpt': excerpt[0].children[0].text,
          mainImage
        }
      },
    }
  }`
  const query = [filter, projection].join(' ')
  const homePage = await client.fetch(query).catch(err => console.error(err))
  console.log('')
  return homePage
}

module.exports = getHomePage
