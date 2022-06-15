import getProcessEnv from './_utils/process';

const config = {
  storyBlokAccessTokenPreview: getProcessEnv('STORYBLOK_ACCESS_TOKEN_PREVIEW') || 'nRVzo5rGsuMqrW99ACZEhQtt',
  storyBlokAccessTokenPublic: getProcessEnv('STORYBLOK_ACCESS_TOKEN_PUBLIC') || 'RbVU49zZMFu7L17gTBVgkAtt',
  storyBlokVersion: 'draft',
  storyBlokAccessToken: '', 
};

config.storyBlokAccessToken = config.storyBlokAccessTokenPreview;

export default config;