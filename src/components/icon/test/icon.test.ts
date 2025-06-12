import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-icon.js"

async function defaultFixture(name = "close") {
  return fixture(html` <leu-icon name=${name}></leu-icon> `)
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

  it("renders the correct icon path", async () => {
    const el = await defaultFixture("angleDropup")

    const path = el.shadowRoot.querySelector("path")
    expect(path).to.have.attribute("d", "M7 14.5L12 9.5L17 14.5H7Z")
  })

  it("renders a placeholder if the icon is not found", async () => {
    const el = await defaultFixture("notExisting")

    const placeholder = el.shadowRoot.querySelector(".placeholder")

    expect(placeholder).to.exist

    const svg = el.shadowRoot.querySelector("svg")
    expect(svg).not.to.exist
  })
})
