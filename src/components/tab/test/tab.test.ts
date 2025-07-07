import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-tab.js"
import "../leu-tab-button.js"
import "../leu-tab-panel.js"

async function defaultFixture() {
  return fixture(html`
    <leu-tab>
      <leu-tab-button slot="button" name="one" active>One</leu-tab-button>
      <leu-tab-button slot="button" name="two">Two</leu-tab-button>
      <leu-tab-button slot="button" disabled>Disabled</leu-tab-button>

      <leu-tab-panel slot="panel" name="one">One</leu-tab-panel>
      <leu-tab-panel slot="panel" name="two">Two</leu-tab-panel>
    </leu-tab>
  `)
}

describe("LeuTab", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-tab")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
