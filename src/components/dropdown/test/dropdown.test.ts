import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-dropdown.js"

async function defaultFixture(args = { expanded: false, inverted: false }) {
  return fixture(
    html` <leu-dropdown
      label="Download"
      ?expanded=${args.expanded}
      ?inverted=${args.inverted}
    >
      <leu-menu>
        <leu-menu-item>Als CSV Tabelle</leu-menu-item>
        <leu-menu-item>Als XLS Tabelle</leu-menu-item>
        <hr />
        <leu-menu-item>Als PNG exportieren</leu-menu-item>
        <leu-menu-item>Als SVG exportieren</leu-menu-item>
        <leu-menu-item>Als PDF exportieren</leu-menu-item>
      </leu-menu>
    </leu-dropdown>`,
  )
}

describe("LeuDropdown", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-dropdown")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("closes the popup when the document is clicked outside the component", async () => {
    const el = await defaultFixture()

    const toggleButton = el.shadowRoot.querySelector("leu-button")
    toggleButton.click()
    await el.updateComplete

    expect(el.expanded).toBe(true)

    document.body.click()

    expect(el.expanded).toBe(false)
  })

  it("reflects the inverted property to the internal button", async () => {
    const el = await defaultFixture({ inverted: true })
    await el.updateComplete

    const toggleButton = el.shadowRoot.querySelector("leu-button")
    expect(toggleButton.inverted).toBe(true)
  })
})
