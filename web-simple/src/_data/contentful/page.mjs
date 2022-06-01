import contentfulClient from '../../utils/contentfulClient.mjs';

export default async function (data, slug) {
  const pageResult = await contentfulClient.getEntries({
    content_type: 'page',
    include: 3,
    select: 'sys,fields',
    'fields.slug': slug
  }).catch(console.error);

  if (pageResult.items && pageResult.items.length > 0) {
    data.contentfulPage = pageResult.items[0];
  }
} 
