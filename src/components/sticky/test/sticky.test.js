import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-sticky.js"

async function defaultFixture() {
  return fixture(html` <leu-sticky /> `)
}

describe("LeuSticky", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-sticky")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
