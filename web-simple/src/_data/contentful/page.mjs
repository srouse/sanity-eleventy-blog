import contentfulClient from '../../utils/contentfulClient.mjs';

export default async function (data, slug) {
  await contentfulClient.getEntries({
    content_type: 'page',
    select: 'sys,fields',
    'fields.slug': slug
  })
    .then((results) => {
      // delete data.contentfulPage;
      if (results.items && results.items.length > 0) {
        data.contentfulPage = results.items[0].fields;
      }
    })
    .catch(console.error)
}