import { html } from "lit"
import "../leu-checkbox.js"
import "../leu-checkbox-group.js"
import { ifDefined } from "lit/directives/if-defined.js"

export default {
  title: "Components/Checkbox/Group",
  component: "leu-checkbox-group",
  argTypes: {
    legend: { control: "text" },
    orientation: {
      options: ["vertical", "horizontal"],
      control: { type: "checkbox" },
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
    <form>
      <input type="checkbox" checked name="c1" />
      <input type="checkbox" checked value="rba" name="c2" />
      <input type="checkbox" value="rbb" name="c3" />
      <leu-checkbox-group
        orientation=${ifDefined(orientation)}
        label=${ifDefined(label)}
      >
        <leu-checkbox value="1" name="checkbox-button" disabled
          >Kurz</leu-checkbox
        >
        <leu-checkbox value="2" name="checkbox-button"
          >Etwas Länger</leu-checkbox
        >
        <leu-checkbox value="3" name="checkbox-button" disabled
          >Deaktiviert dazwischen</leu-checkbox
        >
        <leu-checkbox value="4" name="checkbox-button"
          >Ein langes Label um sicher ein umbruch zu erzwingen</leu-checkbox
        >
      </leu-checkbox-group>
    </form>
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
