import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-link.js"

import { SIZES } from "../ChipLink.js"

export default {
  title: "Chip/Link",
  component: "leu-chip-link",
  argTypes: {
    size: { control: "select", options: Object.values(SIZES) },
  },
  args: {
    label: "Publikationen",
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
      <leu-chip-link
        size=${ifDefined(args.size)}
        ?inverted=${args.inverted}
        label=${args.label}
      ></leu-chip-link>
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}

export const Large = Template.bind({})
Large.args = { size: SIZES.large }
