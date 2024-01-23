import { html } from "lit"
import "../leu-radio.js"
import "../leu-radio-group.js"
import { ifDefined } from "lit/directives/if-defined.js"

export default {
  title: "Radio/Group",
  component: "leu-radio-group",
  argTypes: {
    label: { control: "text" },
    orientation: {
      options: ["VERTICAL", "HORIZONTAL"],
      control: { type: "radio" },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81935&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template({ label, orientation }) {
  return html`
    <leu-radio-group
      orientation=${ifDefined(orientation)}
      label=${ifDefined(label)}
    >
      <leu-radio
        identifier="1"
        value="1"
        name="radio-button"
        label="Kurz"
        disabled
      ></leu-radio>
      <leu-radio
        identifier="2"
        value="2"
        name="radio-button"
        label="Etwas Länger"
      ></leu-radio>
      <leu-radio
        identifier="3"
        value="3"
        name="radio-button"
        label="Ein langes Label um sicher ein umbruch zu erzwingen"
      ></leu-radio>
    </leu-radio-group>
  `
}

export const Horizontal = Template.bind({})
export const HorizontalLabel = Template.bind({})
HorizontalLabel.args = {
  label: "Anrede",
}

export const Vertical = Template.bind({})
Vertical.args = {
  orientation: "VERTICAL",
}

export const VerticalLabel = Template.bind({})
VerticalLabel.args = {
  orientation: "VERTICAL",
  label: "Anrede",
}
