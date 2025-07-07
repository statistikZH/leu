/* eslint-disable import/no-duplicates */
import { Meta } from "@storybook/web-components"
import { html } from "lit"

import { LeuTab } from "../leu-tab.js"
import "../leu-tab.js"
import "../leu-tab-button.ts"
import "../leu-tab-panel.ts"

type StoryArgs = LeuTab

export default {
  title: "Components/Tab",
  component: "leu-tab",
} satisfies Meta<StoryArgs>

interface Args {
  activeTab?: string
}

function Template(args: Args = {}) {
  // TODO: activeTab update?
  return html`
    <p>${args.activeTab}</p>
    <leu-tab .activeTab=${args.activeTab}>
      <leu-tab-button slot="button" name="one" active>One</leu-tab-button>
      <leu-tab-button slot="button" name="two">Two</leu-tab-button>
      <leu-tab-button slot="button" disabled>Disabled</leu-tab-button>

      <leu-tab-button slot="button" name="one2">One 2</leu-tab-button>
      <leu-tab-button slot="button" name="two2">Two 2</leu-tab-button>
      <leu-tab-button slot="button" name="three2">Disabled 2</leu-tab-button>
      <leu-tab-button slot="button" name="one3">One 3</leu-tab-button>
      <leu-tab-button slot="button" name="two3">Two 3</leu-tab-button>
      <leu-tab-button slot="button" name="three3">Disabled 3</leu-tab-button>

      <leu-tab-panel slot="panel" name="one">One</leu-tab-panel>
      <leu-tab-panel slot="panel" name="two">Two</leu-tab-panel>
    </leu-tab>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  activeTab: "one",
}
