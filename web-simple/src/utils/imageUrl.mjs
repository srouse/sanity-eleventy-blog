import imageUrl from '@sanity/image-url';
import sanityClient from './sanityClient.mjs';

/**
 * urlFor
 */
export default function imageUrlFor(source) {
  return imageUrl(sanityClient).image(source).format('webp');
}