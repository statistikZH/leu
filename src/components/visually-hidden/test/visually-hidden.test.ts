import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-visually-hidden.js"

async function defaultFixture() {
  return fixture(html`
    <leu-visually-hidden>
      This is a text that shouldn't be visible but still accessible.
    </leu-visually-hidden>
  `)
}

describe("LeuVisuallyHidden", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-visually-hidden")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the default slot content", async () => {
    const el = await defaultFixture()

    expect(el.children).toHaveLength(0)
    expect(el.textContent.trim()).toBe(
      "This is a text that shouldn't be visible but still accessible.",
    )
  })
})
