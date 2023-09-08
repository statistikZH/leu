import { html } from "lit"
import "../../../exports/define/input.js"

export default {
  title: "input",
  component: "leu-input",
  argTypes: {
    identifier: {},
    label: { control: "text", defaultValue: "Label" },
    value: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
  },
}

function Template({
  label = "",
  value = "",
  checked = false,
  disabled = false,
}) {
  return html`
    <leu-input .value=${value} ?checked=${checked} ?disabled=${disabled}>
      ${label}
    </leu-input>
  `
}

export const Regular = Template.bind({})

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const CheckedDisabled = Template.bind({})
CheckedDisabled.args = {
  checked: true,
  disabled: true,
}
