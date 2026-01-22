import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range.js"
import type { LeuRange } from "../leu-range.js"
import "../../input/leu-input.js"

type StoryArgs = LeuRange
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Range",
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
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: (args) =>
    html` <leu-range
      label=${args.label}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      value=${ifDefined(args.value)}
      step=${ifDefined(args.step)}
      ?hide-label=${args["hide-label"]}
      ?show-ticks=${args["show-ticks"]}
      ?show-range-labels=${args["show-range-labels"]}
    >
    </leu-range>`,
}

export const Regular = {
  ...Template,
  args: { min: 0, max: 100, value: "15" },
}

export const Multiple = {
  ...Template,
  args: { min: 1965, max: 2022, value: "1965, 2022", multiple: true },
}

export const Labeled = {
  ...Template,
  args: { label: "Wert auswählen", min: 100000, max: 200000 },
}

export const HiddenLabel = {
  ...Template,
  args: {
    label: "Wert auswählen",
    min: 100000,
    max: 200000,
    "hide-label": true,
  },
}

export const Disabled = {
  ...Template,
  args: { label: "Wert auswählen", min: 0, max: 100, disabled: true },
}

export const Step = {
  ...Template,
  args: { min: 5, max: 123, step: 13 },
}

function CombinedTemplate(args: StoryArgs) {
  const values = (args.value ?? "").split(",").map((v) => Number(v.trim()))
  function handleInputInput() {
    const inputs = document.querySelectorAll("leu-input")
    const range = document.querySelector("leu-range")
    range.value = [inputs[0].value, inputs[1].value]
  }
  return html`
    <leu-range
      label=${args.label}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      value=${ifDefined(args.value)}
      step=${ifDefined(args.step)}
      ?hide-label=${args["hide-label"]}
      ?show-ticks=${args["show-ticks"]}
      ?show-range-labels=${args["show-range-labels"]}
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

export const Combined = {
  render: CombinedTemplate,
  args: {
    min: 1965,
    max: 2022,
    value: "1965, 2022",
    multiple: true,
  },
}
