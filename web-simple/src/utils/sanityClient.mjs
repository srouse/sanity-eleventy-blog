import sanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';
import sanityConfig from '../../client-config.mjs';

const sanityClientObj = sanityClient({
  ...sanityConfig,
  useCdn: false,// !process.env.SANITY_READ_TOKEN,
  // token: process.env.SANITY_READ_TOKEN,
  apiVersion: 'v2021-10-21',
});

export default sanityClientObj;

let data;

/**
 * urlFor
 */
export function imageUrl(source, config ) {
  const {
    width,
    format = 'webp'
  } = config;

  let imgObj = sanityImage(sanityClientObj).image(source)
  if (width) {
    imgObj = imgObj.width(width);
  }
  if (format) {
    imgObj = imgObj.format(format);
  }
  const url = imgObj.url();
  
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
    data.context.images[imgNameClean] = url;
    return `/_assets/${imgNameClean}`;
  }else{
    return url;// want to pull from sanity for preview...
  }
}

export function configImages(buildData) {
  data = buildData;
}