import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

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
      <span slot="caption"
        >Quelle: Amt für Statistik und Daten Kanton Zürich</span
      >
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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("conditionally renders slots", async () => {
    let el = await defaultFixture()

    expect(
      el.shadowRoot.querySelector(".chart-wrapper__description"),
    ).toBeTruthy()
    expect(el.shadowRoot.querySelector(".chart-wrapper__caption")).toBeTruthy()
    expect(el.shadowRoot.querySelector(".chart-wrapper__download")).toBeTruthy()

    el = await fixture(html`<leu-chart-wrapper></leu-chart-wrapper>`)

    expect(
      el.shadowRoot.querySelector(".chart-wrapper__description"),
    ).toBeFalsy()
    expect(el.shadowRoot.querySelector(".chart-wrapper__caption")).toBeFalsy()
    expect(el.shadowRoot.querySelector(".chart-wrapper__download")).toBeFalsy()

    // Check that the title and chart slots are always present
    expect(el.shadowRoot.querySelector(".chart-wrapper__title")).toBeTruthy()
    expect(el.shadowRoot.querySelector(".chart-wrapper__chart")).toBeTruthy()
  })

  it("shows a spinner when pending is set", async () => {
    const el = await defaultFixture({ pending: true })

    expect(
      el.shadowRoot.querySelector(".chart-wrapper__spinner-container"),
    ).toBeTruthy()
    expect(
      el.shadowRoot.querySelector("leu-spinner.chart-wrapper__spinner"),
    ).toBeTruthy()
  })
})
