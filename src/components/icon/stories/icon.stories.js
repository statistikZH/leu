import { html } from "lit"
import "../leu-icon.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { paths } from "../paths.js"

export default {
  title: "Components/Icon",
  component: "leu-icon",
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(paths),
    },
    color: {
      control: {
        type: "color",
        presetColors: ["#009ee0", "#d93c1a", "#1a7f1f"],
      },
    },
  },
}

function Template({ name, size, color }) {
  return html` <leu-icon
    style="color: ${color}; ${size ? `--leu-icon-size: ${size}px` : ""};"
    name=${ifDefined(name)}
  ></leu-icon>`
}

export const Regular = Template.bind({})
Regular.args = {
  size: 24,
  name: "addNew",
}

export const Small = Template.bind({})
Small.args = {
  size: 16,
  name: "check",
}

export const Colored = Template.bind({})
Colored.args = {
  name: "smileyDevastated",
  size: 24,
  color: "#d93c1a",
}
