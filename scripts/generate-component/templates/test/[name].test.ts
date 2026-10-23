import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../[namespace]-[name].js"
import { type [Namespace][Name] } from "../[Name].js"

async function defaultFixture() {
  return fixture<[Namespace][Name]>(html`<[namespace]-[name]></[namespace]-[name]>`)
}

describe("[Namespace][Name]", () => {
  it("is a defined element", async () => {
    const el = customElements.get("[namespace]-[name]")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })
})
