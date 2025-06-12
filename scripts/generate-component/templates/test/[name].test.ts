import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../[namespace]-[name].js"

async function defaultFixture() {
  return fixture(html`<[namespace]-[name]></[namespace]-[name]>`)
}

describe("[Namespace][Name]", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("[namespace]-[name]")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
