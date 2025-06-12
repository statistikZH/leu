import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-spinner.js"

async function defaultFixture() {
  return fixture(html`<leu-spinner></leu-spinner>`)
}

describe("LeuSpinner", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-spinner")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders a svg element with a 56x56 viewbox", async () => {
    const el = await defaultFixture()

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).to.have.attribute("viewBox", "0 0 56 56")
  })
})
