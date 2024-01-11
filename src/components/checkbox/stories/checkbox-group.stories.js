import { html } from "lit"
import "../leu-checkbox.js"
import "../leu-checkbox-group.js"

export default {
  title: "Checkbox/Group",
  component: "leu-checkbox-group",
  argTypes: {
    legend: { control: "text" },
    orientation: {
      options: ["VERTICAL", "HORIZONTAL"],
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

function Template({ legend, orientation }) {
  return html`
    <leu-checkbox-group orientation=${orientation}>
      <span slot="legend">${legend}</span>
      <leu-checkbox identifier="1" value="1" name="checkbox-button" disabled
        >Kurz</leu-checkbox
      >
      <leu-checkbox identifier="2" value="2" name="checkbox-button"
        >Etwas Länger</leu-checkbox
      >
      <leu-checkbox identifier="3" value="3" name="checkbox-button" disabled
        >Deaktiviert dazwischen</leu-checkbox
      >
      <leu-checkbox identifier="4" value="4" name="checkbox-button"
        >Ein langes Label um sicher ein umbruch zu erzwingen</leu-checkbox
      >
    </leu-checkbox-group>
  `
}

export const Horizontal = Template.bind({})
export const HorizontalLegend = Template.bind({})
HorizontalLegend.args = {
  legend: "Anrede",
}

export const Vertical = Template.bind({})
Vertical.args = {
  orientation: "VERTICAL",
}

export const VerticalLegend = Template.bind({})
VerticalLegend.args = {
  orientation: "VERTICAL",
  legend: "Anrede",
}
