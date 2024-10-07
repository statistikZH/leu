import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range.js"

/**
 * @type {import("@storybook/web-components").Meta}
 */
export default {
  title: "Range",
  component: "leu-range",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81936&mode=design",
    },
  },
  args: {
    label: "Bereich",
  },
}

function Template({ label, disabled, value, min, max, step, multiple }) {
  return html`
    <leu-range
      label=${label}
      ?disabled=${disabled}
      ?multiple=${multiple}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      value=${ifDefined(value)}
      step=${ifDefined(step)}
    >
    </leu-range>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  min: 0,
  max: 100,
  value: "15",
}

export const Multiple = Template.bind({})
Multiple.args = {
  min: 1965,
  max: 2022,
  value: "1965, 2022",
  multiple: true,
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Wert auswählen",
  min: 100000,
  max: 200000,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Wert auswählen",
  min: 0,
  max: 100,
  disabled: true,
}

export const Step = Template.bind({})
Step.args = {
  min: 5,
  max: 123,
  step: 13,
}
