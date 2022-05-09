// import dotenv from 'dotenv';
import sanityClient from '@sanity/client';
import sanityConfig from '../../client-config.mjs';

/*dotenv.config({
  // path: `.env.${process.env.NODE_ENV || 'development'}`
  path: `.env.development`
});*/

export default sanityClient({
  ...sanityConfig,
  useCdn: false,// !process.env.SANITY_READ_TOKEN,
  // token: process.env.SANITY_READ_TOKEN,
  apiVersion: 'v2021-10-21',
});
