import { html } from "../templateEngine";
import state from "../../_data/state";

export default function() {
  return html`
    <scw-stack
      scw-background-color-grey-095>
      <scw-stack 
        class="pageWidth"
        scw-color-grey-03
        scw-padding-top-5s
        style="height: 400px;">
        Current page: ${ state?.context?.route }
        Type: ${ state?.context?.type } 
      </scw-stack>
    </scw-stack>
  `;
}