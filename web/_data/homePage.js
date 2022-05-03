const groq = require('groq')
const client = require('../utils/sanityClient.js')

async function getHomePage () {
  // Learn more: https://www.sanity.io/docs/data-store/how-queries-work
  const filter = groq`*[_type == "page" && _id == "frontpage"]`
  const projection = groq`[0]`
  const query = [filter, projection].join(' ')
  const homePage = await client.fetch(query).catch(err => console.error(err))
  return homePage
}

module.exports = getHomePage
