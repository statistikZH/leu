import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"

import "../../dropdown/leu-dropdown.js"
import "../leu-chart-wrapper.js"
import { LeuChartWrapper } from "../ChartWrapper.js"

type StoryArgs = LeuChartWrapper
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/ChartWrapper",
  component: "leu-chart-wrapper",
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: ({ pending }) =>
    html`<leu-chart-wrapper ?pending=${pending}>
      <h2 slot="title">Entwicklung der Leerwohnungsziffer seit 1984</h2>
      <span slot="description">Leerwohnungsziffer, in Prozent</span>
      <img
        style="display: block; width: 100%; height: auto;"
        slot="chart"
        src="https://placehold.co/1200x400"
        alt="A placeholder to indicate where a chart would appear"
      />
      <span slot="caption">Quelle: Statistisches Amt des Kantons Zürich</span>
      <leu-dropdown slot="download" label="Download">
        <leu-icon name="download" slot="icon"></leu-icon>
        <leu-menu>
          <leu-menu-item
            href="https://www.web.statistik.zh.ch/ogd/daten/ressourcen/KTZH_00001120_00002165.csv"
            >OGD Ressource</leu-menu-item
          >
          <leu-menu-item>Als CSV Tabelle</leu-menu-item>
          <leu-menu-item>Als XLS Tabelle</leu-menu-item>
          <hr />
          <leu-menu-item>Als PNG exportieren</leu-menu-item>
          <leu-menu-item>Als SVG exportieren</leu-menu-item>
          <leu-menu-item disabled>Als PDF exportieren</leu-menu-item>
        </leu-menu>
      </leu-dropdown>
    </leu-chart-wrapper>`,
}

export const Regular = {
  ...Template,
  args: {
    // Add default args here
    pending: false,
  },
}
