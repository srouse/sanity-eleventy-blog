// import metadata from './_data/metadata.mjs';
// import navLists from './_data/navLists.mjs';
// import posts from './_data/posts.mjs';
// import router from './router.mjs';
// import contentfulPages from './_data/contentful/pages.mjs';

// import pages from './_data/pages.mjs';
import Router from '../utils/Router.mjs';
import homeRoute from './routes/homeRoute.mjs';
import pageRoute from './routes/pageRoute.mjs';

// order matters, usually page is last and a catch all...
export const router = new Router([
  homeRoute,
  pageRoute
]);

export async function getRoutes(data) {
  // ====== global to each page =====
  // both browser and server
  // await metadata(data);

  // route lookups
  data.urls = {
    'DESIGN_SYSTEM_URL': '/_js/scu-web-components/dist/docs/',
    'PREVIEW': '/_preview/?route='
  };

  const routesObj = {routes:[]};
  const routes = routesObj.routes;
  routes.push(router.routeViaId('home'));

  // server only...
  if (data.context.type === 'server') {
    /*
    await pages(data);// 'pageData' will look for this data in the server build
    data.pages.map(page => {
      const routeInfo = router.routeViaId(page._type, [page.slug] );
      routes.push(routeInfo);
    });
    */
  }
  return routesObj;
}
