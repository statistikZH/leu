import { Meta, StoryObj } from "@storybook/web-components-vite"
import { action } from "storybook/actions"
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
    oninput: action("input"),
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
      prefix=${ifDefined(args.prefix)}
      suffix=${ifDefined(args.suffix)}
      .valueFormatter=${args.valueFormatter}
      ?hide-label=${args["hide-label"]}
      ?show-ticks=${args["show-ticks"]}
      ?show-range-labels=${args["show-range-labels"]}
      @input=${args.oninput}
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
  args: {
    min: 5,
    max: 134,
    step: 13,
    "show-ticks": true,
    "show-range-labels": true,
  },
}

export const Ticks = {
  ...Template,
  args: {
    label: "Jahr auswählen",
    min: 1962,
    max: 2022,
    step: 1,
    "show-ticks": true,
    "show-range-labels": true,
  },
}

export const Suffix = {
  ...Template,
  args: {
    label: "Betrag auswählen",
    min: 100,
    max: 200,
    step: 1,
    suffix: " CHF",
    "show-range-labels": true,
  },
}

export const CustomFormatter = {
  ...Template,
  args: {
    label: "Schuljahr",
    min: 15,
    max: 24,
    step: 1,
    "show-range-labels": true,
    valueFormatter: (value: number) => `${value}/${value + 1}`,
  },
}

function CombinedTemplate(args: StoryArgs) {
  const values = (args.value ?? "").split(",").map((v) => Number(v.trim()))
  const valueState = [...values]

  function updateAndSyncState(newValues: number[]) {
    valueState[0] = newValues[0]
    valueState[1] = newValues[1]
    const inputs = document.querySelectorAll("leu-input")
    const range = document.querySelector("leu-range")

    inputs[0].value = valueState[0].toString()
    inputs[1].value = valueState[1].toString()
    range.value = valueState
  }

  function handleInputInput() {
    const inputs = document.querySelectorAll("leu-input")
    updateAndSyncState([inputs[0].value, inputs[1].value].map((v) => Number(v)))
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
      prefix=${ifDefined(args.prefix)}
      suffix=${ifDefined(args.suffix)}
      ?hide-label=${args["hide-label"]}
      ?show-ticks=${args["show-ticks"]}
      ?show-range-labels=${args["show-range-labels"]}
      @input=${(e) => {
        updateAndSyncState(e.target.valueAsArray)
      }}
    >
    </leu-range>
    <div style="display: flex; gap: 1rem; margin-top: 1rem;">
      <leu-input
        label="Von"
        ?disabled=${args.disabled}
        type="number"
        min=${ifDefined(args.min)}
        max=${ifDefined(args.max)}
        value=${ifDefined(values[0])}
        step=${ifDefined(args.step)}
        size="small"
        @input=${handleInputInput}
      ></leu-input>
      <leu-input
        label="Von"
        ?disabled=${args.disabled}
        type="number"
        min=${ifDefined(args.min)}
        max=${ifDefined(args.max)}
        value=${ifDefined(values[1])}
        step=${ifDefined(args.step)}
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
