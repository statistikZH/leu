import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { action } from "@storybook/addon-actions"

import "../leu-search.js"

import { SEARCH_SIZES } from "../Search.js"

export default {
  title: "Components/Search",
  component: "leu-search",
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: Object.values(SEARCH_SIZES),
    },
    submitLabel: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81934&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
  args: {
    submitLabel: undefined,
  },
}

function Template(args) {
  const { value, label, size, clearable, submitButton, submitLabel, onSubmit } =
    args

  return html`
    <leu-search
      value=${ifDefined(value)}
      label=${label}
      size=${ifDefined(size)}
      ?clearable=${clearable}
      ?submitButton=${submitButton}
      submitLabel=${ifDefined(submitLabel)}
      @leu:submit=${onSubmit}
    >
    </leu-search>

    <div style="background:#3E99ED; padding:40px; margin-top:40px;">
      <leu-search
        value=${ifDefined(value)}
        label=${label}
        size=${ifDefined(size)}
        ?clearable=${clearable}
        ?submitButton=${submitButton}
        submitLabel=${ifDefined(submitLabel)}
        @leu:submit=${onSubmit}
      >
      </leu-search>
    </div>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  value: "",
  clearable: true,
  label: "Suchen",
  size: SEARCH_SIZES.REGULAR,
  submitButton: true,
  submitLabel: undefined,
  onSubmit: action("leu:submit"),
}
Regular.parameters = {
  docs: {
    description: {
      story:
        "To render a basic input field only the `label` attribute is required. The `label` is necessary for accessibility reasons.",
    },
  },
}
