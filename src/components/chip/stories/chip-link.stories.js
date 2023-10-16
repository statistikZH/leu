import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-link.js"

export default {
  title: "Chip/Link",
  component: "leu-chip-link",
}

function Template(args) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
    >
      <leu-chip-link size=${ifDefined(args.size)} ?inverted=${args.inverted}
        >Does this look better?</leu-chip-link
      >
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}
