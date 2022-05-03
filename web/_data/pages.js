// const BlocksToMarkdown = require('@sanity/block-content-to-markdown')
const groq = require('groq')
const client = require('../utils/sanityClient.js')
// const serializers = require('../utils/serializers')
const overlayDrafts = require('../utils/overlayDrafts')
const hasToken = !!client.config().token

/* function generatePost (post) {
  return {
    ...post,
    body: BlocksToMarkdown(post.body, { serializers, ...client.config() })
  }
} */

async function getPages () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "page" && defined(slug)]`
  const projection = groq`{
    _id,
    publishedAt,
    title,
    slug,
    content[]{
      ...,
      children[]{
        ...,
      }
    }
  }`
  const order = `| order(publishedAt asc)`
  const query = [filter, projection, order].join(' ')
  const docs = await client.fetch(query).catch(err => console.error(err))
  const reducedDocs = overlayDrafts(hasToken, docs)
  return reducedDocs;
  // const preparePosts = reducedDocs.map(generatePost)
  // return preparePosts
}

module.exports = getPages