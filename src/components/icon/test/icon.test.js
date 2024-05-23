import { html } from "lit"
import { fixture, expect, elementUpdated } from "@open-wc/testing"

import "../leu-icon.js"

async function defaultFixture() {
  return fixture(html` <leu-icon></leu-icon> `)
}

describe("LeuIcon", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-icon")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders a 24x24 icon by default", async () => {
    const el = await defaultFixture()

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).to.have.attribute("width", "24")
    expect(svg).to.have.attribute("height", "24")
  })

  it("renders a small icon", async () => {
    const el = await fixture(html` <leu-icon size="16"></leu-icon> `)

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).to.have.attribute("width", "16")
    expect(svg).to.have.attribute("height", "16")
  })

  it("renders the correct icon path", async () => {
    const el = await fixture(html` <leu-icon name="angleDropup"></leu-icon> `)

    const path = el.shadowRoot.querySelector("path")
    expect(path).to.have.attribute("d", "M7 14.5L12 9.5L17 14.5H7Z")
  })

  it("doesn't reflect the size value to the viewBox attribute", async () => {
    const el = await defaultFixture()

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).to.have.attribute("viewBox", "0 0 24 24")

    el.size = 16
    await elementUpdated(el)

    expect(svg).to.have.attribute("viewBox", "0 0 24 24")
  })
})
