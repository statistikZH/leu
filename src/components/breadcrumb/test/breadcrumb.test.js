import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-breadcrumb.js"

async function defaultFixture() {
  return fixture(html` <leu-breadcrumb /> `)
}

describe("LeuBreadcrumb", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-breadcrumb")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
