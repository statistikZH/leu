import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-file-input.js"
import { type LeuFileInput } from "../FileInput.js"

async function defaultFixture() {
  return fixture<LeuFileInput>(
    html`<leu-file-input label="File upload"></leu-file-input>`,
  )
}

describe("LeuFileInput", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-file-input")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
