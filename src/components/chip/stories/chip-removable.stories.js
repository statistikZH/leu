import { html } from "lit"

import "../leu-chip-removable.js"

export default {
  title: "Chip Removable",
  component: "leu-chip-removable",
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
      <leu-chip-removable ?inverted=${args.inverted}
        >${args.label}</leu-chip-removable
      >
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}
