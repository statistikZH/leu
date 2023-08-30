import { html } from "lit"
import "../../../exports/define/radio.js"

export default {
  title: "Radio",
  component: "leu-radio",
  argTypes: {
    identifier: {},
    label: { control: "text", defaultValue: "Label" },
    value: { control: "text" },
    checked: { control: "boolean", defaultValue: false },
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
    <leu-radio .value=${value} ?checked=${checked} ?disabled=${disabled}>
      ${label}
    </leu-radio>
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
