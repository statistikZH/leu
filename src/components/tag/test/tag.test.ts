import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-tag.js"

async function defaultFixture() {
  return fixture(html`<leu-tag>Abgeschlossen</leu-tag>`)
}

describe("LeuTag", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-tag")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders with default slot content", async () => {
    const el = await defaultFixture()

    expect(el).to.have.trimmed.text("Abgeschlossen")
  })
})
