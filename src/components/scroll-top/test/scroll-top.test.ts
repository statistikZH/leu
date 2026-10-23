import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-scroll-top.js"

async function defaultFixture() {
  return fixture(html` <leu-scroll-top /> `)
}

describe("LeuScrollTop", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-scroll-top")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })
})
