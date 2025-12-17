import { Meta, StoryObj } from "@storybook/web-components"
import { action } from "@storybook/addon-actions"
import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-file-input.js"
import { LeuFileInput } from "../FileInput.js"

type StoryArgs = LeuFileInput
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/FileInput",
  component: "leu-file-input",
  args: {
    oninput: action("input"),
    onchange: action("change"),
  },
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: (args: StoryArgs) => html`
    <leu-file-input
      name="file"
      label=${ifDefined(args.label)}
      accept=${ifDefined(args.accept)}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      ?required=${args.required}
      @input=${args.oninput}
      @change=${args.onchange}
    ></leu-file-input>
  `,
}

export const Regular = {
  ...Template,
  args: {
    accept: "image/*",
    disabled: false,
    multiple: false,
    label: "Dokumente hochladen",
    // Add default args here
  },
}
