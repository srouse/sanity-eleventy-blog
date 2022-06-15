import { html } from "./templateEngine";
import state from "../_data/state";
import htmlTplt from "./layouts/html.tplt";
import { NavigationNodeItem } from "../_utils/types";
import getNavigations from "../_data/navigations";
import { slugToUrl } from "../_utils/storyblokClient";

export default async function(): Promise<string> {
  // we need navigations for this template...
  await getNavigations();

  const navigationNode = state.page as unknown as NavigationNodeItem;
  let childrenHtml = getChildren(navigationNode);

  const content = html`
    <scw-stack
      scw-padding-height-8s
      scw-padding-width-10s
      scw-gap-2s>
      <h1>Navigation Node</h1>
      <scw-stack
        scw-gap-0s>
        <scw-element
          scw-text-06>
          ${navigationNode.name}
        </scw-element>
        <scw-element
          scw-text-04>
          ${slugToUrl(navigationNode.full_slug)}
        </scw-element>
      </scw-stack>
      ${childrenHtml}
    </scw-stack>
  `;
  return htmlTplt(content);
}

function getChildren(
  navigationNode: NavigationNodeItem
) {
  let childrenHtml = '';
  if (navigationNode.content.children) {
    childrenHtml = navigationNode.content.children.map(
      (childSlug: {full_slug:string}) => {
        const child = state.entities[childSlug.full_slug];
        const childChildrenHtml = getChildren(child);
        return html`
          <scw-stack
            scw-padding-left-3s>
            <scw-stack
              scw-gap-0s>
              <scw-element
                scw-text-06>
                ${child.name}
              </scw-element>
              <scw-element
                scw-text-04>
                ${slugToUrl(child.full_slug)}
              </scw-element>
            </scw-stack>
            ${childChildrenHtml}
          </scw-stack>
        `;
      }
    ).join('');
  }
  return childrenHtml;
}