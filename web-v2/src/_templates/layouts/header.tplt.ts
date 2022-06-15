import { html } from "../templateEngine";
import { ContextTypes, NavigationNodeItem } from '../../_utils/types';
import { rootNavigationFolder, slugToUrl } from "../../_utils/storyblokClient";
import state from "../../_data/state";

export default function() {
  return html`
    <scw-flex-h
      class="pageWidth"
      scw-height-11s
      scw-alignment-stretch>
      <scw-flex-v
        scw-alignment-bottom
        scw-padding-bottom-1s>
        <scw-link
          design="plain"
          aria-label="I'm a div"
          href="{{ url( 'page', '') }}">
          <!--img 
            src="{ { imageUrl(metadata.logo, {width:160}) } }"
            alt="{ { metadata.logo.alt } }"
            title="{ { metadata.logo.caption } }"
            width="160" height="77" /-->
        </scw-link>
      </scw-flex-v>
      <scw-flex-v
        scw-alignment-stretch
        scw-fill
        scw-background-grey-10
        style="
          position: initial;
          z-index: 100;"
        scw-stack-bp-md>
        <scw-flex-h
          scw-alignment-right-bottom
          scw-alignment-left-bp-md
          scw-hide-bp-md
          scw-fill>
          <scw-menu
            aria-label="utility menu"
            scw-stack-bp-md>
            <scw-menu-item
              design="utility"
              icon="icon-placeholder"
              aria-label="Design System"
              href="{{ url( 'direct', urls.DESIGN_SYSTEM_URL ) }}"
              target="_dsys">
            </scw-menu-item>
            ${ state.context.type == 'server' ? html`
              <scw-menu-item
                design="utility"
                icon="icon-placeholder"
                aria-label="Preview"
                href="${slugToUrl(state.page?.full_slug, ContextTypes.browser)}">
              </scw-menu-item>
            ` : html`
            <scw-menu-item
                design="utility"
                icon="icon-placeholder"
                aria-label="Static"
                href="${slugToUrl(state.page?.full_slug, ContextTypes.server)}">
              </scw-menu-item> 
            `}
            <!--{% set previewUrl = [urls.PREVIEW, context.route] | join %}-->
          </scw-menu>
        </scw-flex-h>
        <scw-flex-h
          scw-alignment-right
          scw-hide-bp-md
          style="position: initial;">
          <scw-menu
            aria-label="main menu"
            keyboard-direction="horizontal"
            style="position: initial;"
            scw-stack-bp-md>
            ${renderNavigation()}
          </scw-menu>
        </scw-flex-h>
      </scw-flex-v>

      <!-- {% if contentfulPage %}
        {% include "contentful/edit.njk" %}
      {% endif %}-->
    </scw-flex-h>
    <scw-element 
      scw-border-bottom-grey-09>
    </scw-element>
  `;
}

function renderNavigation(
  nav?: NavigationNodeItem,
) {
  if (!nav) {
    nav = state.entities[rootNavigationFolder];
  }
  return html`
    ${nav.content?.children?.map((child: NavigationNodeItem) => {
      const childSlug = child.full_slug;
      const childNode = state.entities[childSlug];

      let childHtml = '';
      if (childNode.content.children?.length > 0) {
        childHtml = html`
          <scw-menu
            aria-label="${child.name} menu"
            aria-hidden="true"
            scw-stack
            scw-gap-2s
            scw-padding-2s
            scw-border-primary
            scw-background-color-grey-10
            style="
              position: absolute;
              top: 100%;
              display: none;
              z-index: 100;
              left: 0; right: 0;">
            ${childNode.content.children.map((subChild: NavigationNodeItem) => {
              const subChildSlug = subChild.full_slug;
              const subChildNode = state.entities[subChildSlug];
              const subChildNodePage = subChildNode?.content?.page;
              return html`
                <scw-menu-item
                  design="main"
                  color="primary"
                  aria-label="${subChildNode?.name}"
                  href="${slugToUrl(subChildNodePage?.full_slug)}">
                </scw-menu-item>
              `;
            }).join('')}
          </scw-menu>
        `;
      }

      return html`
        <scw-menu-item
          design="main"
          aria-label="${childNode?.name}"
          href="${slugToUrl(childNode?.content?.page?.full_slug)}">
        </scw-menu-item>
        ${ childHtml }`;
    }).join('')}
  `;
}