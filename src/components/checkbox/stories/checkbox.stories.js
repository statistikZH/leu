import { html } from "lit"
import "../leu-checkbox.js"

export default {
  title: "Checkbox",
  component: "leu-checkbox",
  argTypes: {
    label: {
      control: "text",
    },
  },
}

function Template({ label = "Label", value, checked, disabled }) {
  return html`
    <leu-checkbox
      .value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      id="checkbox-1"
    >
      ${label}
    </leu-checkbox>
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
