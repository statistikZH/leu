import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-chip-link.js"

async function defaultFixture() {
  return fixture(html`
    <leu-chip-link href="https://zh.ch/daten">Daten</leu-chip-link>
  `)
}

describe("LeuChipLink", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-link")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el).to.have.trimmed.text("Daten")
  })

  it("renders a link element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("a")).to.exist
  })

  it("passes the href attribute to the link", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("a").getAttribute("href")).to.equal(
      "https://zh.ch/daten",
    )
  })

  it("delegates the focus to the a element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("a")).to.equal(
      el.shadowRoot.activeElement,
    )
  })
})
