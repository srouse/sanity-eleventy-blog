import getProcessEnv from "./src/utils/process.mjs"

export default {
  // Storyblok
  accessTokenPreview: getProcessEnv('STORYBLOK_ACCESS_TOKEN_PREVIEW') || 'nRVzo5rGsuMqrW99ACZEhQtt',
  accessTokenPublic: getProcessEnv('STORYBLOK_ACCESS_TOKEN_PUBLIC') || 'RbVU49zZMFu7L17gTBVgkAtt',
}