import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-pagination.js"

async function defaultFixture() {
  return fixture(html` <leu-pagination></leu-button>`)
}

describe("LeuPagination", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-pagination")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
