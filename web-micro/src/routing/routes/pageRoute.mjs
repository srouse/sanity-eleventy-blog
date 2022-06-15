
export default {
  id: 'page',
  url: arg1 => `/${arg1}`,
  template: 'page.njk',
  data: async (data, arg1) => {
    await pageData(data, arg1);
  }
};
