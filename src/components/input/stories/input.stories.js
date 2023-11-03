import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-input.js"

import { SIZE_TYPES } from "../Input.js"
import { ICON_NAMES } from "../../icon/icon.js"

export default {
  title: "Input",
  component: "leu-input",
  argTypes: {
    size: {
      control: {
        type: "select",
        options: SIZE_TYPES,
      },
    },
    icon: { control: "select", options: ICON_NAMES },
  },
}

function Template(args) {
  const {
    label,
    value,
    pattern,
    prefix,
    suffix,
    size,
    icon,
    type,
    min,
    max,
    minlength,
    maxlength,
    disabled = false,
    required = false,
    clearable = false,
    novalidate = false,
  } = args

  return html`
    <leu-input
      value=${ifDefined(value)}
      pattern=${ifDefined(pattern)}
      prefix=${ifDefined(prefix)}
      suffix=${ifDefined(suffix)}
      size=${ifDefined(size)}
      icon=${ifDefined(icon)}
      type=${ifDefined(type)}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      minlength=${ifDefined(minlength)}
      maxlength=${ifDefined(maxlength)}
      ?disabled=${disabled}
      ?required=${required}
      ?clearable=${clearable}
      ?novalidate=${novalidate}
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

export const Search = Template.bind({})
Search.args = {
  label: "Suchen",
  clearable: true,
  size: SIZE_TYPES.SMALL,
  icon: "search",
}
