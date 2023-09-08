import { html } from "lit"
import "../../../exports/define/radio.js"
import "../../../exports/define/radio-group.js"

export default {
  title: "Radio/Group",
  component: "leu-radio",
  argTypes: {
    legend: { control: "text", defaultValue: "Sortierung" },
    value: { control: "text" },
  },
}

function Template({ legend = "" }) {
  return html`
    <leu-radio-group>
      <span slot="legend">${legend}</span>
      <leu-radio identifier="1" value="1">Label 1</leu-radio>
      <leu-radio identifier="2" value="2">Label 2</leu-radio>
      <leu-radio identifier="3" value="3">Label 3</leu-radio>
    </leu-radio-group>
  `
}

export const Regular = Template.bind({})
