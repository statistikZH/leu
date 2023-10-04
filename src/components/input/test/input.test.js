import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../../../exports/define/input.js"

async function defaultFixture() {
  return fixture(html` <leu-input> Name </leu-input> `)
}

describe("LeuInput", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-input")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
