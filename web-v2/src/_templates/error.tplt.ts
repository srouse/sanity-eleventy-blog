import htmlTplt from "./layouts/html.tplt";
import { html } from "./templateEngine";

export default async function(): Promise<string> {
  // TODO: load in other needed information...
  const content = html`ERROR`;
  return htmlTplt(content);
}