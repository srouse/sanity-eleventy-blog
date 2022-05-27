import contentfulClient from '../../utils/contentfulClient.mjs';

export default async function (data, slug) {
  /*await contentfulClient.getEntries({
    content_type: 'page',
    select: 'sys,fields',
    'fields.slug': slug
  })
    .then((results) => {
      // delete data.contentfulPage;
      if (results.items && results.items.length > 0) {
        data.contentfulPage = results.items[0].fields;
        console.log('CONTENTFUL PAGE', data.contentfulPage);
      }
    })
    .catch(console.error)*/

  const pageResult = await contentfulClient.getEntries({
    content_type: 'page',
    select: 'sys,fields',
    'fields.slug': slug
  }).catch(console.error);


  if (pageResult.items && pageResult.items.length > 0) {
    data.contentfulPage = pageResult.items[0];

    
    if (data.contentfulPage.fields.content) {
      const childPromiseArr = [];
      data.contentfulPage.fields.content.map(child => {
        if (child.sys.contentType.sys.id === 'contentContainer') {
          childPromiseArr.push(
            contentfulClient.getEntries({
              content_type: 'contentContainer',
              select: 'sys,fields',
              'sys.id': child.sys.id
            }).then(result => {
              if (result.items && result.items.length > 0) {
                const childResult = result.items[0];
                child.sys = childResult.sys;
                child.fields = childResult.fields;
              }
            }).catch(console.error)
          );
        }

        if (child.fields.sectionLayout) {
          childPromiseArr.push(
            contentfulClient.getEntries({
              content_type: 'layout',
              select: 'sys,fields',
              'sys.id': child.fields.sectionLayout.sys.id
            }).then(result => {
              if (result.items && result.items.length > 0) {
                const childResult = result.items[0];
                child.fields.sectionLayout.sys = childResult.sys;
                child.fields.sectionLayout.fields = childResult.fields;
              }
            }).catch(console.error)
          );
        }
      
      });
      await Promise.all( childPromiseArr );
    }
  }
}