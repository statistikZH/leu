import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-radio.js"
import "../leu-radio-group.js"

async function defaultFixture() {
  return fixture(html`
    <leu-radio-group>
      <span slot="legend">Legende</span>
      <leu-radio
        identifier="1"
        value="1"
        name="radio-button"
        disabled
        label="Kurz"
      ></leu-radio>
      <leu-radio
        identifier="2"
        value="2"
        name="radio-button"
        label="Etwas Länger"
      ></leu-radio>
      <leu-radio
        identifier="3"
        value="3"
        name="radio-button"
        label="Ein langes Label um sicher ein umbruch zu erzwingen"
      ></leu-radio>
    </leu-radio-group>
  `)
}

describe("LeuRadio", () => {
  it("is a defined element", async () => {
    const elRadio = await customElements.get("leu-radio")
    const elRadioGroup = await customElements.get("leu-radio-group")

    await expect(elRadio).not.to.be.undefined
    await expect(elRadioGroup).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
