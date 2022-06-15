import homePage from "../../_data/homePage.mjs";

export default {
  id: 'home',
  url: () => `/`,
  // urlRegEx: '', ?
  template: 'index.njk',
  data: async (data) => {
    await homePage(data);
  }
}
