import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"

import "../../button/leu-button.js"
import "../../icon/leu-icon.js"
import "../leu-placeholder.js"
import { LeuPlaceholder } from "../Placeholder.js"

type StoryArgs = LeuPlaceholder
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Placeholder",
  component: "leu-placeholder",
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: (_args) =>
    html` <leu-placeholder>
      <span slot="title">Keine Ergebnisse zu «xyzbwhe» gefunden.</span>
      <p slot="text" style="margin: 0;">
        Überprüfen Sie die Schreibweise der eingegebenen Wörter. Versuchen Sie
        andere Stichwörter. Versuchen Sie allgemeinere Stichwörter.
      </p>
      <leu-button slot="cta">
        <leu-icon name="close" slot="before"></leu-icon>
        Neu laden
      </leu-button>
    </leu-placeholder>`,
}

export const Regular = {
  ...Template,
  args: {
    // Add default args here
  },
}
