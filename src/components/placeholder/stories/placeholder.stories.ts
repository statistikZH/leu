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
      <h2 slot="title">Keine Ergebnisse zu «Regoin Zürich» gefunden.</h2>
      <p slot="description">
        Überprüfen Sie die Schreibweise der eingegebenen Wörter. Versuchen Sie
        andere Stichwörter. Versuchen Sie allgemeinere Stichwörter.
      </p>
      <leu-button slot="cta"> Suche zurücksetzen </leu-button>
    </leu-placeholder>`,
}

export const Regular = {
  ...Template,
  args: {
    // Add default args here
  },
}
