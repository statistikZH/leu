import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { action } from "@storybook/addon-actions"

import "../leu-input.js"

import { SIZES } from "../Input.js"
import { paths as iconPaths } from "../../icon/paths.js"

export default {
  title: "Components/Input",
  component: "leu-input",
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: Object.values(SIZES),
    },
    icon: { control: "select", options: Object.keys(iconPaths) },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81934&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template(args) {
  const {
    label,
    submitLabel,
    onSubmit,
    value,
    error,
    pattern,
    prefixText,
    suffixText,
    size,
    icon,
    type,
    min,
    max,
    minlength,
    maxlength,
    step,
    disabled = false,
    required = false,
    clearable = false,
    novalidate = false,
  } = args

  return html`
    <leu-input
      value=${ifDefined(value)}
      error=${ifDefined(error)}
      pattern=${ifDefined(pattern)}
      prefixText=${ifDefined(prefixText)}
      suffixText=${ifDefined(suffixText)}
      size=${ifDefined(size)}
      icon=${ifDefined(icon)}
      type=${ifDefined(type)}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      minlength=${ifDefined(minlength)}
      maxlength=${ifDefined(maxlength)}
      step=${ifDefined(step)}
      label=${label}
      submitLabel=${ifDefined(submitLabel)}
      ?disabled=${disabled}
      ?required=${required}
      ?clearable=${clearable}
      ?novalidate=${novalidate}
      @leu:submit=${onSubmit}
    >
    </leu-input>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Vorname",
}
Regular.parameters = {
  docs: {
    description: {
      story:
        "To render a basic input field only the `label` attribute is required. The `label` is necessary for accessibility reasons.",
    },
  },
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Name",
  value: "Andrea Hugentobler",
}
Filled.parameters = {
  docs: {
    description: {
      story: "To supply a value to the input field, use the `value` attribute.",
    },
  },
}

export const PrefixedNumber = Template.bind({})
PrefixedNumber.args = {
  label: "Preis, in CHF",
  prefixText: "CHF",
  type: "number",
}
PrefixedNumber.parameters = {
  docs: {
    description: {
      story:
        'With the `prefixText` attribute you can add a string that is prepended to the input field. This is useful for defining a unit of the input value. Be aware that the prefix is not included in the value of the input field. It is also hidden from screen readers. You have to add the prefix to the `label` attribute like "Preis, in CHF".',
    },
  },
}

export const SuffixedNumber = Template.bind({})
SuffixedNumber.args = {
  label: "Länge, in cm",
  suffixText: "cm",
  type: "number",
  min: 90,
  max: 120,
}
SuffixedNumber.parameters = {
  docs: {
    description: {
      story:
        'With the `prefixText` attribute you can add a string that is appended to the input field. This is useful for defining a unit of the input value. Be aware that the prefix is not included in the value of the input field. It is also hidden from screen readers. You have to add the suffix to the `label` attribute like "Länge, in cm".',
    },
  },
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
Clearable.parameters = {
  docs: {
    description: {
      story:
        "The `clearable` attribute adds a button to the input field that clears the value. This is useful for search fields. The button is only visible if the input field has a value. The button will also not visible if the input is invalid.",
    },
  },
}

export const Search = Template.bind({})
Search.args = {
  label: "Suchen",
  clearable: true,
  size: SIZES.SMALL,
  icon: "search",
  novalidate: true,
}
Search.parameters = {
  docs: {
    description: {
      story:
        "The input field can also be displayed in a smaller size. Search fields or input fields inside other components (e.g. Select or Pagination) usually use this option. To display the search icon, use the `icon` attribute. With `novalidate` the validation can be disabled.",
    },
  },
}

export const SearchWithSubmit = Template.bind({})
SearchWithSubmit.args = {
  label: "Suchen",
  submitLabel: "Senden",
  onSubmit: action("leu:submit"),
  clearable: true,
  size: SIZES.SMALL,
  novalidate: true,
}
SearchWithSubmit.parameters = {
  docs: {
    description: {
      story:
        "Submit Button (submitLabel) can be used to search only on click with event 'leu:submit'.",
    },
  },
}

export const CustomError = Template.bind({})
CustomError.args = {
  type: "email",
  label: "E-Mail",
  value: "example@domain.com",
  error: "Diese E-Mail Adresse wird bereits verwendet.",
}
CustomError.parameters = {
  docs: {
    description: {
      story:
        "The input component uses the browsers native validation. If the data is sent to a server, then there it will be validated again. To display those errors, use the `error` attribute. It won't interfere with the native validation also wont be removed.",
    },
  },
}

export const Step = Template.bind({})
Step.args = {
  label: "Tage",
  type: "number",
  min: "1",
  max: "7",
  step: "1",
}
