import postsList from './_data/postsList.mjs';
import postData from './_data/post.mjs';
import pageData from './_data/page.mjs';
import homePage from './_data/homePage.mjs';
import Router from './utils/Router.mjs';
// import contentfulPages from './_data/contentful/pages.mjs';
import contentfulPage from './_data/contentful/page.mjs';

export default new Router(
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
    {
      id: 'page',
      url: arg1 => `/${arg1}`,
      template: 'page.njk',
      data: async (data, arg1) => {
        await pageData(data, arg1);
      }
    },
    {
      id: 'contentful-page',
      url: arg1 => `/contentful/${arg1}`,
      template: 'contentful/page.njk',
      data: async (data, arg1) => {
        await contentfulPage(data, arg1);
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