import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-progress-bar.js"
import { LeuProgressBar } from "../ProgressBar.js"

type StoryArgs = LeuProgressBar
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/ProgressBar",
  component: "leu-progress-bar",
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: ({ label, value, indeterminate }) =>
    html` <leu-progress-bar
      .label="${ifDefined(label)}"
      .value="${ifDefined(value)}"
      ?indeterminate=${indeterminate}
    ></leu-progress-bar>`,
}

export const Regular = {
  ...Template,
  args: {
    value: 50,
    label: "Datei hochladen",
  },
}

export const Indeterminate = {
  ...Template,
  args: {
    indeterminate: true,
    label: "Datei hochladen",
  },
}
