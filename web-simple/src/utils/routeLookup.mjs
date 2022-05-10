const POST_INDEX = '/blog';

export default function routeLookup( _type, slug ) {
  switch ( _type ) {
    case 'post' :
      return `${POST_INDEX}/${slug}`;
    case 'page' :
      return `/${slug}`;
    case 'home' :
      return `/`;
    case 'blogIndex' :
      return `${POST_INDEX}`;
  }
}

/*
// Need to go forwards and reverse...thinking this out...
// {_type:'post',slug:'my-post'} <= & => '/post/my-post'
export const routeTemplates = [
  {
    type: 'home',
    template: `/`,
    data: async (data) => {
      await homePage(data);
    }
  },
  {
    type: 'blogIndex',
    template: `/blog/blogIndex.njk`,
    data: async (data) => {
      await posts(data);
    }
  },
  {
    type: 'page',
    template: `/:slug`,
    data: async (data, slug) => {
      await pageData(data, slug);
    }
  },
  {
    type: 'post',
    template: `/posts/:slug`,
    data: async (data, slug) => {
      await postData(data, slug);
    }
  }
];
*/