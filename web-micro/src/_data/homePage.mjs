import Storyblok from '../utils/storyblokClient.mjs';

export default async function homePage(data) {
  if (!data.homePage) {
    const results = await Storyblok.get(
      "cdn/stories/new-digital-banking-summit-credit-union", 
      {
        version: "draft",
      })
      .catch((error) => {
        console.log(error);
      });

    data.homePage = results?.data?.story;
    console.log(data.homePage)
  }
}

