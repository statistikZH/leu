import { html } from "lit"
import "../../../exports/define/radio.js"
import "../../../exports/define/radio-group.js"

const ORIENTATION = {
  VERTICAL: "Vertical",
  HORIZONTAL: "Horizontal",
}

export default {
  title: "Radio/Group",
  component: "leu-radio",
  argTypes: {
    legend: { control: "text" },
    value: { control: "text" },
    orientation: {
      options: Object.keys(ORIENTATION),
      labels: ORIENTATION,
      control: { type: "radio" },
    },
  },
}

function Template({ legend = "", orientation = ORIENTATION.HORIZONTAL }) {
  return html`
    <leu-radio-group orientation=${orientation}>
      <span slot="legend">${legend}</span>
      <leu-radio identifier="1" value="1">Label 1</leu-radio>
      <leu-radio identifier="2" value="2">Label 2</leu-radio>
      <leu-radio identifier="3" value="3">Label 3</leu-radio>
    </leu-radio-group>
  `
}

export const Regular = Template.bind({})
