import { html } from "lit"
import "../../../exports/define/radio.js"
import "../../../exports/define/radio-group.js"

export default {
  title: "Radio/Group",
  component: "leu-radio-group",
  argTypes: {
    legend: { control: "text" },
    orientation: {
      options: ["VERTICAL", "HORIZONTAL"],
      control: { type: "radio" },
    },
  },
}

function Template({ legend, orientation }) {
  return html`
    <leu-radio-group orientation=${orientation}>
      <span slot="legend">${legend}</span>
      <leu-radio identifier="1" value="1" name="radio-button" disabled
        >Kurz</leu-radio
      >
      <leu-radio identifier="2" value="2" name="radio-button"
        >Etwas Länger</leu-radio
      >
      <leu-radio identifier="3" value="3" name="radio-button"
        >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
      >
    </leu-radio-group>
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
