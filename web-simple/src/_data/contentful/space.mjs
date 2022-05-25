import contentfulClient from '../../utils/contentfulClient.mjs';

export default async function (data) {
  await contentfulClient.getSpace()
    .then((space) => {
      data.contentfulSpace = space;
    })
    .catch(console.error)
}