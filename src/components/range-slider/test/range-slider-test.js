import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-range-slider.js"

async function defaultFixture() {
  return fixture(html`
    <leu-range-slider
      id="slider-default"
      .label="Test Label"
      .min="0"
      .max="100"
    >
    </leu-range-slider>
  `)
}

describe("LeuRangeSlider", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-range-slider")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
