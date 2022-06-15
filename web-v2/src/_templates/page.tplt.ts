import { html } from "./templateEngine";
import getNavigations from '../_data/navigations';
import state from "../_data/state";
import htmlTplt from "./layouts/html.tplt";
import headerTplt from "./layouts/header.tplt";
import footerTplt from "./layouts/footer.tplt";

export default async function(): Promise<string> {
  // we need navigations for this template...
  await getNavigations();

  const content = html`
    <scw-stack>
      ${headerTplt()}
      <h1>Page</h1>
      <h2>Full Slug: ${state.page.full_slug}</h2>
      <h2>Context Type: ${state.context.type}</h2>
      ${footerTplt()}
    </scw-stack>
  `;
  return htmlTplt(content);
}