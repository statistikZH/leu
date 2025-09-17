import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../[namespace]-[name].js"
import { type [Namespace][Name] } from "../[Name].js"

async function defaultFixture() {
  return fixture<[Namespace][Name]>(html`<[namespace]-[name]></[namespace]-[name]>`)
}

describe("[Namespace][Name]", () => {
  it("is a defined element", async () => {
    const el = customElements.get("[namespace]-[name]")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
