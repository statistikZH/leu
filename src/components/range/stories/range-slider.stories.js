import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range.js"
import "../../input/leu-input.js"

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

function Template({
  label,
  disabled,
  value,
  min,
  max,
  step,
  multiple,
  options,
}) {
  return html`
    <leu-range
      label=${label}
      ?disabled=${disabled}
      ?multiple=${multiple}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      value=${ifDefined(value)}
      step=${ifDefined(step)}
      options=${ifDefined(options)}
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

export const Options = Template.bind({})
Options.args = {
  label: "Schuljahr",
  options: ["2000/01", "2002/03", "2003/04", "irgend ein Text", "2004/05"],
  value: 2,
}

export const MultipleOptions = Template.bind({})
MultipleOptions.args = {
  label: "Schuljahr",
  options: ["2000/01", "2002/03", "2003/04", "irgend ein Text", "2004/05"],
  value: "0, 3",
  multiple: true,
}

function CombinedTemplate({
  label,
  disabled,
  value = "",
  min,
  max,
  step,
  multiple,
  options,
}) {
  const values = value.split(",").map((v) => Number(v.trim()))
  function handleInputInput() {
    const inputs = document.querySelectorAll("leu-input")
    const range = document.querySelector("leu-range")
    range.value = [inputs[0].value, inputs[1].value]
  }
  return html`
    <leu-range
      label=${label}
      ?disabled=${disabled}
      ?multiple=${multiple}
      min=${ifDefined(min)}
      max=${ifDefined(max)}
      value=${ifDefined(value)}
      step=${ifDefined(step)}
      options=${ifDefined(options)}
      @input=${(e) => {
        const inputs = document.querySelectorAll("leu-input")
        const valueList = e.target.valueAsArray

        inputs[0].value = valueList[0]
        inputs[1].value = valueList[1]
      }}
    >
    </leu-range>
    <div style="display: flex; gap: 1rem;">
      <leu-input
        label="Von"
        ?disabled=${disabled}
        type="number"
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        value=${ifDefined(values[0])}
        step=${ifDefined(step)}
        size="small"
        @input=${handleInputInput}
      ></leu-input>
      <leu-input
        label="Von"
        ?disabled=${disabled}
        type="number"
        min=${ifDefined(min)}
        max=${ifDefined(max)}
        value=${ifDefined(values[1])}
        step=${ifDefined(step)}
        size="small"
        @input=${handleInputInput}
      ></leu-input>
    </div>
  `
}

export const Combined = CombinedTemplate.bind({})
Combined.args = {
  min: 1965,
  max: 2022,
  value: "1965, 2022",
  multiple: true,
}
