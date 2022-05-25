import contentful from 'contentful';
import config from '../../client-config.mjs';

export default contentful.createClient({
  ...config,
});

let data;

export function imageUrl(image, width, height) {
  
  let url = `${image.fields.file.url}?fm=webp`;
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
    return url;// want to pull from sanity for preview...
  }

}

export function configImages(buildData) {
  data = buildData;
}