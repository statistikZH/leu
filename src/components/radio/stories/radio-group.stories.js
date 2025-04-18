import { html } from "lit"
import "../leu-radio.js"
import "../leu-radio-group.js"
import { ifDefined } from "lit/directives/if-defined.js"

export default {
  title: "Components/Radio/Group",
  component: "leu-radio-group",
  argTypes: {
    label: { control: "text" },
    orientation: {
      options: ["vertical", "horizontal"],
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
      <leu-radio value="1" name="radio-button" disabled>Kurz</leu-radio>
      <leu-radio value="2" name="radio-button">Etwas Länger</leu-radio>
      <leu-radio value="3" name="radio-button"
        >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
      >
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
  orientation: "vertical",
}

export const VerticalLabel = Template.bind({})
VerticalLabel.args = {
  orientation: "vertical",
  label: "Anrede",
}
