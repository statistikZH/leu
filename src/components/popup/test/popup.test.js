import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-popup.js"

async function defaultFixture() {
  return fixture(html`
    <leu-popup
      ><div slot="anchor"></div>
      <p>Popup content</p></leu-popup
    >
  `)
}

describe("LeuPopup", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-popup")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
