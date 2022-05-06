import metadata from './_data/metadata.mjs';
import postsList from './_data/postsList.mjs';
import routeLookup from './utils/routeLookup.mjs';
import postData from './_data/post.mjs';
import posts from './_data/posts.mjs';

export default async function getRoutes(data) {
  // global to each page...
  // both browser and server
  await metadata(data);
  // server only...
  if (data.context.type === 'server') {
    await posts(data);// postData will look for these first on server
  }

  const routes = {
    routes: {
      '/': {
        template: 'index.njk',
        data: async (data) => {
          data.body = 'index page';
        }
      },
      '/blog': {
        template: 'blog/blogIndex.njk',
        data: async (data) => {
          await posts(data);
          data.body = 'blog page';
        }
      }
    }
  }

  // dynamically add all the blog posts to the list
  await postsList(data);
  data.postsList.map( post => {
    const url = routeLookup(post._type, post.slug);
    routes.routes[url] = {
      template: 'blog/blog.njk',
      data: async (data) => {
        await postData(data, post.slug);
        await postsList(data);
      }
    };
  })

  return routes;
}
