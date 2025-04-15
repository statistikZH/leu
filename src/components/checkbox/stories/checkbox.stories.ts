import { html } from "lit"
import "../leu-checkbox.js"

export default {
  title: "Components/Checkbox",
  component: "leu-checkbox",
  argTypes: {
    label: {
      control: "text",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81935&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template({ label = "Label", value, checked, disabled, name = "" }) {
  return html`
    <leu-checkbox
      .value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      name=${name}
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
