import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-link.js"

import { SIZES } from "../ChipLink.js"

export default {
  title: "Chip Link",
  component: "leu-chip-link",
  argTypes: {
    size: { control: "select", options: Object.values(SIZES) },
  },
  args: {
    label: "Publikationen",
  },
}

function Template(args) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
    >
      <leu-chip-link size=${ifDefined(args.size)} ?inverted=${args.inverted}
        >${args.label}</leu-chip-link
      >
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}

export const Large = Template.bind({})
Large.args = { size: SIZES.large }
