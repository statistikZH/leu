import { html } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import "../leu-popup.js"
import "../../button/leu-button.js"

export default {
  title: "Popup",
  component: "leu-popup",
  argTypes: {
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
  },
}

const popupStyles = {
  background: "white",
  border: "1px solid var(--leu-color-black-40)",
  padding: "0.5rem",
  boxShadow: "var(--leu-box-shadow-regular)",
}

function Template(args = {}) {
  return html`<leu-popup
    ?active=${args.active}
    ?flip=${args.flip}
    ?shift=${args.shift}
    placement=${ifDefined(args.placement)}
  >
    <leu-button slot="anchor" label="Open popup"></leu-button>
    <div style=${styleMap(popupStyles)}>Popup content</div>
  </leu-popup>`
}

export const Regular = Template.bind({})
Regular.args = {
  active: true,
  placement: "bottom-start",
  flip: true,
  shift: true,
}
