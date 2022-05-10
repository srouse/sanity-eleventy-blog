import metadata from './_data/metadata.mjs';
import postsList from './_data/postsList.mjs';
import routeLookup from './utils/routeLookup.mjs';
import postData from './_data/post.mjs';
import posts from './_data/posts.mjs';
import pageList from './_data/pageList.mjs';
import pageData from './_data/page.mjs';
import pages from './_data/pages.mjs';

const tmpts = '';

export default async function getRoutes(data) {
  // ====== global to each page =====
  // both browser and server
  await metadata(data);
  await postsList(data); // can't make a post lookup w/o
  await pageList(data); // can't make a post lookup w/o

  // server only...
  if (data.context.type === 'server') {
    await posts(data);// 'postData' will look for this data in the server build
    await pages(data);// 'pageData' will look for this data in the server build
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

  // posts
  data.postsList.map( post => {
    const url = routeLookup(post._type, post.slug);
    routes.routes[url] = {
      template: `${tmpts}blog/blog.njk`,
      data: async (data) => {
        await postData(data, post.slug);
        await postsList(data);
      }
    };
  });

  data.pagesList.map( page => {
    const url = routeLookup(page._type, page.slug);
    routes.routes[url] = {
      template: `${tmpts}page.njk`,
      data: async (data) => {
        await pageData(data, page.slug);
      }
    };
  });

  return routes;
}
