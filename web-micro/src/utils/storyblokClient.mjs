import StoryblokClient from 'storyblok-js-client';
import config from '../../client-config.mjs';

export default new StoryblokClient({
  accessToken: config.accessTokenPreview,
  cache: {
    clear: "auto",
    type: "memory",
  },
});
