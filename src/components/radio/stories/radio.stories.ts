import { html } from "lit"
import "../leu-radio.js"

export default {
  title: "Components/Radio",
  component: "leu-radio",
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

function Template({
  label = "Label",
  value = "",
  checked = false,
  disabled = false,
  name = "",
}) {
  return html`
    <leu-radio
      .value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      name=${name}
    >
      ${label}
    </leu-radio>
  `
}

export const Regular = {
  render: Template,
}

export const Checked = {
  render: Template,

  args: {
    checked: true,
  },
}

export const Disabled = {
  render: Template,

  args: {
    disabled: true,
  },
}

export const CheckedDisabled = {
  render: Template,

  args: {
    checked: true,
    disabled: true,
  },
}
