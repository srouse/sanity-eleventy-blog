import state from "../../_data/state";
import { html } from "../templateEngine";

export default function(
  content: string,
) {
  return html`
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{{ title or metadata.title }}</title>
      <meta name="Description" content="{{ description or metadata.description }}">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <link rel="canonical" href="https://www.summitcreditunion.com/">
      <link rel="shortlink" href="https://www.summitcreditunion.com/">
      <meta property="og:site_name" content="Summit Credit Union">
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://www.summitcreditunion.com/">
      <meta property="og:title" content="Summit Credit Union">
      <meta name="twitter:card" content="summary">
      <meta name="twitter:url" content="https://www.summitcreditunion.com/">
      <meta name="twitter:title" content="Summit Credit Union">
      <meta name="dcterms.title" content="Summit Credit Union">
      <meta name="dcterms.type" content="Text">
      <meta name="dcterms.format" content="text/html">
      <meta name="dcterms.identifier" content="https://www.summitcreditunion.com/">
      <meta name="apple-itunes-app" content="app-id=846243037">
      <link rel="shortcut icon" href="/favicon.ico" type="image/vnd.microsoft.icon">
  
      <!-- Design System -->
      <script type="module">
        import {defineComponents} from '/_js/scu-web-components/dist/scw.js';
        defineComponents();
      </script>
      ${state.context.type == "browser" ?
        html`<link rel="stylesheet" rel="preload" href="/_js/scu-web-components/dist/tokens/styles.css" />` :
        html`<link rel="stylesheet" rel="preload" href="/ssr.css" />`
      }
      <link rel="stylesheet" rel="preload" href="/_js/scu-web-components/dist/tokens/fonts.css" />
      <!-- Design System END -->
  
      <style>
        html, body {
          padding: 0; margin: 0;
        }
  
        .pageWidth {
          max-width: 1200px;
          margin: 0 auto;
          /* transition: padding 0.3s; */
        }
  
        .contentWidth {
          max-width: 900px;
          margin: 0 auto;
          /* transition: padding 0.3s; */
        }
  
        @media screen and (min-width: 0px) and (max-width: 1240px) {
          .contentWidth {
            padding-left: var( --scw-colvw-0-6 );
            padding-right: var( --scw-colvw-0-6 );
          }
        }
  
        /* Short Term THEME Fix  */
        :root {
          --scw-color-01: var( --scw-color-grey-01 );
          --scw-color-02: var( --scw-color-grey-02 );
          --scw-color-03: var( --scw-color-grey-03 );
          --scw-color-04: var( --scw-color-grey-04 );
          --scw-color-05: var( --scw-color-grey-05 );
          --scw-color: var( --scw-color-grey );
          --scw-color-06: var( --scw-color-grey-06 );
          --scw-color-07: var( --scw-color-grey-07 );
          --scw-color-08: var( --scw-color-grey-08 );
          --scw-color-09: var( --scw-color-grey-09 );
          --scw-color-092: var( --scw-color-grey-092 );
          --scw-color-095: var( --scw-color-grey-095 ); 
        }
        /* END THEME FIX */
  
      </style>
    </head>
    <body
      scw-text-05
      scw-background-grey-10>
      ${content}
    </body>
  </html>
  `;

}