import { html } from "lit"
import "../leu-chip.js"

import { ifDefined } from "lit/directives/if-defined.js"

export default {
  title: "Chip",
  component: "leu-chip",
}

function Template(args) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
    >
      <leu-chip
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        ?selected=${ifDefined(args.selected)}
        ?inverted=${ifDefined(args.inverted)}
        >Does this look better?</leu-chip
      >
    </div>
  `
}

export const Toggle = Template.bind({})
Toggle.args = { variant: "toggle" }

export const Radio = Template.bind({})
Radio.args = { variant: "radio" }

export const Removeable = Template.bind({})
Removeable.args = { variant: "removeable" }
