import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-spinner.js"

async function defaultFixture() {
  return fixture(html`<leu-spinner></leu-spinner>`)
}

describe("LeuSpinner", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-spinner")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders a svg element with a 56x56 viewbox", async () => {
    const el = await defaultFixture()

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).toHaveAttribute("viewBox", "0 0 56 56")
  })
})
