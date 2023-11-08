import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-button-group.js"

async function defaultFixture() {
  return fixture(html` <leu-button-group /> `)
}

describe("LeuButtonGroup", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-button-group")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
