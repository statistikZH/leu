import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-tag.js"

async function defaultFixture() {
  return fixture(html`<leu-tag>Abgeschlossen</leu-tag>`)
}

describe("LeuTag", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-tag")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders with default slot content", async () => {
    const el = await defaultFixture()

    expect(el.textContent.trim()).toBe("Abgeschlossen")
  })
})
