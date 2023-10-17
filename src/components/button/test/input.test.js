import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-button.js"

async function defaultFixture() {
  return fixture(html` <leu-button label="button"></leu-button>`)
}

describe("LeuButton", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-button")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
