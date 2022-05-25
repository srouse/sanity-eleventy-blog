import contentfulClient from '../../utils/contentfulClient.mjs';

export default async function (data) {
  await contentfulClient.getEntries({
    content_type: 'page',
    select: 'fields.title,fields.slug'
  })
    .then((pages) => {
      data.contentfulPages = pages;
    })
    .catch(console.error)
}