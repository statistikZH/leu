import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-menu.js"
import "../leu-menu-item.js"

async function defaultFixture() {
  return fixture(html` <leu-menu>
    <leu-menu-item label="Menu Item 1" before="EMPTY"></leu-menu-item>
    <leu-menu-item label="Menu Item 2" before="check" active></leu-menu-item>
    <leu-menu-item label="Menu Item 3" before="EMPTY"></leu-menu-item>
    <hr />
    <leu-menu-item label="Menu Item 3" before="pin" after="CH"></leu-menu-item>
    <leu-menu-item label="Menu Item 4"></leu-menu-item>
  </leu-menu>`)
}

describe("LeuMenu", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-menu")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
