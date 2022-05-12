import sanityImage from '@sanity/image-url';
import sanityClient from './sanityClient.mjs';


let data;

/**
 * urlFor
 */
export default function imageUrl(source, config ) {
  const {
    width,
    format = 'webp'
  } = config;

  let imgObj = sanityImage(sanityClient).image(source)
  if (width) {
    imgObj = imgObj.width(width);
  }
  if (format) {
    imgObj = imgObj.format(format);
  }
  const url = imgObj.url();
  const urlArr = url.split('/');
  const imgName = urlArr.pop();
  const imgNameClean = imgName.replace('?', '-');

  if (data.context.type === 'server') {
    if (!data.context.images) {
      data.context.images = {};
    }
    data.context.images[imgNameClean] = url;
    return `/_assets/${imgNameClean}`;
  }else{
    return url;// want to pull from sanity here...
  }
}

export function configImages(buildData) {
  data = buildData;
}