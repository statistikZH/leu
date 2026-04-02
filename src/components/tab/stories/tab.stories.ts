import { Meta, StoryObj } from "@storybook/web-components-vite"
import { html } from "lit"

import { LeuTab } from "../leu-tab.js"
import "../leu-tab.js"
import "../leu-tab-button.ts"
import "../leu-tab-panel.ts"

type StoryArgs = LeuTab
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Tab",
  component: "leu-tab",
} satisfies Meta<StoryArgs>

interface Args {
  active?: string
}

const Template: Story = {
  render: (args: Args = {}) => {
    return html`
      <p>${args.active}</p>
      <leu-tab .active=${args.active}>
        <leu-tab-button slot="tabs" name="one" active>One</leu-tab-button>
        <leu-tab-button slot="tabs" name="two">Two</leu-tab-button>
        <leu-tab-button slot="tabs" disabled>Disabled</leu-tab-button>

        <leu-tab-button slot="tabs" name="one2">One 2</leu-tab-button>
        <leu-tab-button slot="tabs" name="two2">Two 2</leu-tab-button>
        <leu-tab-button slot="tabs" name="three2">Disabled 2</leu-tab-button>
        <leu-tab-button slot="tabs" name="one3">One 3</leu-tab-button>
        <leu-tab-button slot="tabs" name="two3">Two 3</leu-tab-button>
        <leu-tab-button slot="tabs" name="three3">Disabled 3</leu-tab-button>

        <leu-tab-panel slot="panels" name="one">One</leu-tab-panel>
        <leu-tab-panel slot="panels" name="two">Two</leu-tab-panel>
      </leu-tab>
    `
  },
}

export const Regular = {
  ...Template,
  args: {
    active: "one",
  },
}
