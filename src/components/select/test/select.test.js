import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-select.js"

async function defaultFixture() {
  return fixture(html`
    <leu-select
      options='[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird."]'
      label="Label"
      value=${null}
    >
    </leu-select>
  `)
}

describe("LeuSelect", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-select")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
