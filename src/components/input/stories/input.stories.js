import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-input.js"

export default {
  title: "Input",
  component: "leu-input",
}

function Template({
  label,
  value,
  pattern,
  prefix,
  suffix,
  type,
  min,
  max,
  minlength,
  maxlength,
  disabled = false,
  required = false,
  clearable = false,
}) {
  return html`
    <leu-input
      value=${ifDefined(value)}
      pattern=${ifDefined(pattern)}
      prefix=${ifDefined(prefix)}
      suffix=${ifDefined(suffix)}
      type=${ifDefined(type)}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      minlength=${ifDefined(minlength)}
      maxlength=${ifDefined(maxlength)}
      ?disabled=${ifDefined(disabled)}
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

export const PrefixedNumber = Template.bind({})
PrefixedNumber.args = {
  label: "Preis",
  prefix: "CHF",
  type: "number",
}

export const SuffixedNumber = Template.bind({})
SuffixedNumber.args = {
  label: "Länge",
  suffix: "cm",
  type: "number",
  min: 90,
  max: 120,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Name",
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
