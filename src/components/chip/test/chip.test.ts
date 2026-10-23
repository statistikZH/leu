import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-chip-link.js"

async function defaultFixture() {
  return fixture(html` <leu-chip /> `)
}

describe("LeuChipLink", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-link")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })
})
