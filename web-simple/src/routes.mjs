import metadata from './_data/metadata.mjs';
import navLists from './_data/navLists.mjs';
import posts from './_data/posts.mjs';
import pages from './_data/pages.mjs';
import router from './router.mjs';

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
