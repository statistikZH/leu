import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-chart-wrapper.js"

async function defaultFixture({ pending = false } = {}) {
  return fixture(
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
  )
}

describe("LeuChartWrapper", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-chart-wrapper")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("conditionally renders slots", async () => {
    let el = await defaultFixture()

    expect(el.shadowRoot.querySelector(".description")).to.exist
    expect(el.shadowRoot.querySelector(".caption")).to.exist
    expect(el.shadowRoot.querySelector(".download")).to.exist

    el = await fixture(html`<leu-chart-wrapper></leu-chart-wrapper>`)

    expect(el.shadowRoot.querySelector(".description")).not.to.exist
    expect(el.shadowRoot.querySelector(".caption")).not.to.exist
    expect(el.shadowRoot.querySelector(".download")).not.to.exist

    // Check that the title and chart slots are always present
    expect(el.shadowRoot.querySelector(".title")).to.exist
    expect(el.shadowRoot.querySelector(".chart")).to.exist
  })

  it("shows a spinner when pending is set", async () => {
    const el = await defaultFixture({ pending: true })

    expect(el.shadowRoot.querySelector(".spinner-container")).to.exist
    expect(el.shadowRoot.querySelector("leu-spinner.spinner")).to.exist
  })
})
