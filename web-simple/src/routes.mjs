import metadata from './_data/metadata.mjs';
import postsList from './_data/postsList.mjs';
import routeLookup from './utils/routeLookup.mjs';
import postData from './_data/post.mjs';
import posts from './_data/posts.mjs';

export default async function getRoutes() {
  const routes = {
    data: async (data) => {
      // global to each page...
      await metadata(data);
      if (data.context.type === 'server') {
        await posts(data);
      }
    },
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
  const postsListResult = await postsList({});
  postsListResult.postsList.map( post => {
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



