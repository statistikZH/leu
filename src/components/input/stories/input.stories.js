import { html } from "lit"
import "../../../exports/define/input.js"

export default {
  title: "input",
  component: "leu-input",
  argTypes: {
    identifier: {},
    name: {},
    label: { control: "text", defaultValue: "Label" },
    value: { control: "text" },
    pattern: { control: "text" },
    prefix: { control: "text" },
    suffix: { control: "text" },
    disabled: { control: "boolean", defaultValue: false },
    required: { control: "boolean", defaultValue: false },
    clearable: { control: "boolean", defaultValue: false },
    invalid: { control: "boolean", defaultValue: false },
  },
}

function Template({
  label = "Label",
  value = "",
  pattern = "",
  prefix = "",
  suffix = "",
  disabled = false,
  required = false,
  clearable = false,
  invalid = false,
}) {
  return html`
    <leu-input
      .value=${value}
      pattern=${pattern}
      prefix=${prefix}
      suffix=${suffix}
      ?disabled=${disabled}
      ?required=${required}
      ?clearable=${clearable}
      ?invalid=${invalid}
    >
      ${label}
    </leu-input>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Vorname",
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Name",
  value: "Andrea Hugentobler",
}

export const Prefixed = Template.bind({})
Filled.args = {
  label: "Preis",
  prefix: "CHF",
}

export const Suffixed = Template.bind({})
Filled.args = {
  label: "Länge",
  suffix: "cm",
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const FilledDisabled = Template.bind({})
FilledDisabled.args = {
  disabled: true,
  label: "Name",
  value: "Andrea Hugentobler",
}

export const FilledInvalid = Template.bind({})
FilledInvalid.args = {
  invalid: true,
  label: "Name",
  value: "Andrea Hugentobler",
}
