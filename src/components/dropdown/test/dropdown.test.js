import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-dropdown.js"

async function defaultFixture() {
  return fixture(html` <leu-dropdown label="Download">
    <leu-menu>
      <leu-menu-item>Als CSV Tabelle</leu-menu-item>
      <leu-menu-item>Als XLS Tabelle</leu-menu-item>
      <hr />
      <leu-menu-item>Als PNG exportieren</leu-menu-item>
      <leu-menu-item>Als SVG exportieren</leu-menu-item>
      <leu-menu-item>Als PDF exportieren</leu-menu-item>
    </leu-menu>
  </leu-dropdown>`)
}

describe("LeuDropdown", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-dropdown")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
