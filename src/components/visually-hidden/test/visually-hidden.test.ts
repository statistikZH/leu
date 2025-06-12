import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-visually-hidden.js"

async function defaultFixture() {
  return fixture(html`
    <leu-visually-hidden>
      This is a text that shouldn't be visible but still accessible.
    </leu-visually-hidden>
  `)
}

describe("LeuVisuallyHidden", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-visually-hidden")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).to.be.accessible()
  })

  it("renders the default slot content", async () => {
    const el = await defaultFixture()

    expect(el).dom.to.equal(
      "<leu-visually-hidden>This is a text that shouldn't be visible but still accessible.</leu-visually-hidden>",
    )
  })
})
