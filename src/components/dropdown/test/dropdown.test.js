import { html } from "lit"
import { fixture, expect, elementUpdated } from "@open-wc/testing"

import "../leu-dropdown.js"

async function defaultFixture(args = { expanded: false }) {
  return fixture(html` <leu-dropdown
    label="Download"
    ?expanded=${args.expanded}
  >
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
    const el = customElements.get("leu-dropdown")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("closes the popup when the document is clicked outside the component", async () => {
    const el = await defaultFixture()

    const toggleButton = el.shadowRoot.querySelector("leu-button")
    toggleButton.click()
    await elementUpdated(el)

    expect(el.expanded).to.be.true

    document.body.click()

    expect(el.expanded).to.be.false
  })
})
