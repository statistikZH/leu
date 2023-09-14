import { html } from "lit"
import "../../../exports/define/input.js"

export default {
  title: "input",
  component: "leu-input",
}

function Template({
  label,
  value,
  pattern,
  prefix,
  suffix,
  disabled = false,
  required = false,
  clearable = false,
}) {
  return html`
    <leu-input
      value=${value}
      pattern=${pattern}
      prefix=${prefix}
      suffix=${suffix}
      ?disabled=${disabled}
      ?required=${required}
      ?clearable=${clearable}
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
Prefixed.args = {
  label: "Preis",
  prefix: "CHF",
}

export const Suffixed = Template.bind({})
Suffixed.args = {
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

export const Clearable = Template.bind({})
Clearable.args = {
  label: "Vorname",
  clearable: true,
}
