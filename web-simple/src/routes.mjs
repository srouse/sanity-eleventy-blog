import metadata from './_data/metadata.mjs';
import postsList from './_data/postsList.mjs';
import routeLookup from './utils/routeLookup.mjs';
import postData from './_data/post.mjs';
import posts from './_data/posts.mjs';
const tmpts = '';

export default async function getRoutes(data) {
  // ====== global to each page =====
  // both browser and server
  await metadata(data);
  await postsList(data); // can't make a post lookup w/o

  // server only...
  if (data.context.type === 'server') {
    await posts(data);// 'postData' will look for this data in the server build
  }

  // Routes
  const routes = {
    routes: {
      [routeLookup('home')]: {
        template: `${tmpts}index.njk`,
        data: async (data) => {
          data.body = 'index page';
        }
      },
      [routeLookup('blogIndex')]: {
        template: `${tmpts}blog/blogIndex.njk`,
        data: async (data) => {
          await posts(data);
          data.body = 'blog page';
        }
      }
    }
  }

  // Dynamic Routes
  data.postsList.map( post => {
    const url = routeLookup(post._type, post.slug);
    routes.routes[url] = {
      template: `${tmpts}blog/blog.njk`,
      data: async (data) => {
        await postData(data, post.slug);
        await postsList(data);
      }
    };
  })

  return routes;
}
