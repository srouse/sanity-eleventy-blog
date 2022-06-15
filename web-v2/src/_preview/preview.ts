import { execute } from '../_templates/templateEngine';
import getEntity from '../_data/entity';
import state from '../_data/state';
import { baseFolder } from '../_utils/storyblokClient';
import { ContextTypes } from '../_utils/types';

export default async function run(route) {
  if (!route) {
    const params = new URLSearchParams(window.location.search);
    const routeParam = params.get('route');
    state.context.route = routeParam;
    state.context.type = ContextTypes.browser;
  }else{
    state.context.route = route;
    state.context.type = ContextTypes.browserDyanamic;
  }

  const entity = await getEntity(`${baseFolder}${state.context.route}`);
  const html = await execute(entity);
  writeHTML(html);
}

function writeHTML(html) {
  // BROWSER SYNC needs to inject something into the body...so pass it on.
  // const bodyContent = document.body.innerHTML;
  var newHTML = document.open("text/html", "replace");
  newHTML.write(`${html}`);// ${bodyContent}`);
  newHTML.close();
}

