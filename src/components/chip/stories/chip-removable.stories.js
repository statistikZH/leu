import { html } from "lit"
import { action } from "@storybook/addon-actions"

import "../leu-chip-removable.js"

export default {
  title: "Chip/Removable",
  component: "leu-chip-removable",
  args: {
    label: "Daten",
    onRemove: action("leu:remove"),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81933&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
    html: {
      root: "[data-root]",
    },
  },
}

function Template(args) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
      data-root
    >
      <leu-chip-removable
        @leu:remove=${args.onRemove}
        ?inverted=${args.inverted}
        >${args.label}</leu-chip-removable
      >
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}
