import metadata from './_data/metadata.mjs';
import navLists from './_data/navLists.mjs';
import postsList from './_data/postsList.mjs';
import postData from './_data/post.mjs';
import posts from './_data/posts.mjs';
import pageData from './_data/page.mjs';
import pages from './_data/pages.mjs';
import homePage from './_data/homePage.mjs';
import { RouteTemplates } from './utils/RouteTemplates.mjs';

export const router = new RouteTemplates(
  [
    {
      id: 'home',
      url: () => `/`,
      template: 'index.njk',
      data: async (data) => {
        await homePage(data);
      }
    },
    {
      id: 'blogIndex',
      url: () => `/blog`,
      template: 'blog/blogIndex.njk',
      data: async (data) => {
        await postsList(data);
      }
    },
    // arg1, arg2,... get sent into data call automatically
    {
      id: 'page',
      url: arg1 => `/${arg1}`,
      template: 'page.njk',
      data: async (data, arg1) => {
        await pageData(data, arg1);
      }
    },
    {
      id: 'post',
      url: arg1 => `/blog/${arg1}`,
      template: 'blog/blog.njk',
      data: async (data, arg1) => {
        await postData(data, arg1);
      }
    }
  ]
);

export default async function getRoutes(data) {
  // ====== global to each page =====
  // both browser and server
  await metadata(data);
  await navLists(data); // main, utility and other navs...

  // add some route lookups
  data.urls = {
    'DESIGN_SYSTEM_URL': '/_js/scu-web-components/dist/docs/',
    'PREVIEW': '/_preview/?route='
  };

  const routesObj = {routes:[]};
  const routes = routesObj.routes;
  routes.push(router.routeViaId('home'));
  routes.push(router.routeViaId('blogIndex'));

  // server only...
  if (data.context.type === 'server') {
    await posts(data);// 'postData' will look for this data in the server build
    await pages(data);// 'pageData' will look for this data in the server build
    data.posts.map(post => {
      const routeInfo = router.routeViaId(post._type, [post.slug] );
      routes.push(routeInfo);
    });
    data.pages.map(page => {
      const routeInfo = router.routeViaId(page._type, [page.slug] );
      routes.push(routeInfo);
    });
  }
  return routesObj;
}
