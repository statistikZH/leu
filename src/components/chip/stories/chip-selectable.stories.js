import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-selectable.js"

import { SIZES, VARIANTS } from "../ChipSelectable.js"

export default {
  title: "Chip/Selectable",
  component: "leu-chip-selectable",
  argTypes: {
    variant: { control: "select", options: Object.values(VARIANTS) },
    size: { control: "select", options: Object.values(SIZES) },
    label: { control: "text" },
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
      <leu-chip-selectable
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        ?selected=${args.selected}
        ?inverted=${args.inverted}
        >${args.label}</leu-chip-selectable
      >
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = { size: SIZES.small }

export const Radio = Template.bind({})
Radio.args = { variant: VARIANTS.radio }
