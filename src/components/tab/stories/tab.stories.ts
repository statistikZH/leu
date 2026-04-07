import { Meta, StoryObj } from "@storybook/web-components-vite"
import { action } from "storybook/actions"
import { html } from "lit"

import { LeuTabGroup } from "../leu-tab-group.js"
import "../leu-tab-group.js"
import "../leu-tab.js"
import "../leu-tab-panel.js"
import { ifDefined } from "lit/directives/if-defined.js"

type StoryArgs = LeuTabGroup
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Tab",
  component: "leu-tab-group",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=21161-184423",
    },
  },
  args: {
    onLeuTabPanelShow: action("leu:show-tab-panel"),
  },
} satisfies Meta<StoryArgs>

interface Args {
  active?: string
}

const Template: Story = {
  render: (args: Args = {}) => {
    return html`
      <leu-tab-group
        active=${ifDefined(args.active)}
        @leu:show-tab-panel=${(e) => {
          console.log(e)
          args.onLeuTabPanelShow(e)
        }}
      >
        <leu-tab slot="tabs" name="one" active>One</leu-tab>
        <leu-tab slot="tabs" name="two">Two</leu-tab>

        <leu-tab slot="tabs" name="one2">One 2</leu-tab>
        <leu-tab slot="tabs" name="two2">Two 2</leu-tab>

        <leu-tab slot="tabs" name="one3">One 3</leu-tab>
        <leu-tab slot="tabs" name="two3">Two 3</leu-tab>

        <leu-tab-panel slot="panels" name="one">One</leu-tab-panel>
        <leu-tab-panel slot="panels" name="two">Two</leu-tab-panel>
        <leu-tab-panel slot="panels" name="one2">One 2</leu-tab-panel>
        <leu-tab-panel slot="panels" name="two2">Two 2</leu-tab-panel>
        <leu-tab-panel slot="panels" name="one3">One 3</leu-tab-panel>
        <leu-tab-panel slot="panels" name="two3">Two 3</leu-tab-panel>
      </leu-tab-group>
    `
  },
}

export const Regular = {
  ...Template,
  args: {
    active: "two",
  },
}
