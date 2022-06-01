import contentful from 'contentful';
import config from '../../client-config.mjs';

export default contentful.createClient({
  ...config,
});

/*
const client = contentful.createClient({
  space: "developer_bookshelf",
  accessToken: "preview_0b7f6x59a0",
  host: "preview.contentful.com"
});
*/


let data;

export function imageUrl(image, width, height) {
  if (!image || !image.fields)
    return '';

  let url = image.fields.file.url;
  if (image.fields.file.contentType !== 'image/svg+xml') {
    url = `${image.fields.file.url}?fm=webp`;
  }
  
  if (width) {
    url = `${url}&w=${width}`
  }
  if (height) {
    url = `${url}&w=${height}`
  }

  if (
    data &&
    data.context &&
    data.context.type === 'server'
  ) {
    if (!data.context.images) {
      data.context.images = {};
    }
    const urlArr = url.split('/');
    const imgName = urlArr.pop();
    const imgNameClean = imgName.replace('?', '-');
    data.context.images[imgNameClean] = `https:${url}`;
    return `/_assets/${imgNameClean}`;
  }else{
    return `https:${url}`;// want to pull from contentful for preview...
  }
}

export function configImages(buildData) {
  data = buildData;
}