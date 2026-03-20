import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-radio.js"
import "../leu-radio-group.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-radio-group>
      <span slot="legend">Legende</span>
      <leu-radio
        value="1"
        name="radio-button"
        disabled
        ?checked=${args.checkedValue === "1"}
        >Kurz</leu-radio
      >
      <leu-radio
        value="2"
        name="radio-button"
        ?checked=${args.checkedValue === "2"}
        >Etwas Länger</leu-radio
      >
      <leu-radio
        value="3"
        name="radio-button"
        ?checked=${args.checkedValue === "3"}
        >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
      >
    </leu-radio-group>
  `)
}

describe("LeuRadio", () => {
  it("is a defined element", async () => {
    const elRadioGroup = customElements.get("leu-radio-group")

    await expect(elRadioGroup).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("has an empty default value", async () => {
    const el = await defaultFixture()

    expect(el.value).to.equal("")
  })

  it("updates the value when a radio button is checked", async () => {
    const el = await defaultFixture()
    const leuRadio = el.querySelector('leu-radio[value="2"]')
    const radio = leuRadio.shadowRoot.querySelector("input")

    radio.click()

    expect(el.value).to.equal("2")
  })

  it("doesn't allow multiple radio buttons to be checked", async () => {
    const el = await defaultFixture()
    const leuRadio2 = el.querySelector('leu-radio[value="2"]')
    const leuRadio3 = el.querySelector('leu-radio[value="3"]')
    const radio2 = leuRadio2.shadowRoot.querySelector("input")
    const radio3 = leuRadio3.shadowRoot.querySelector("input")

    radio2.click()
    radio3.click()

    expect(el.value).to.equal("3")
    expect(leuRadio2.checked).to.be.false
    expect(leuRadio3.checked).to.be.true
  })

  it("has a default value that reflects the checked radio button", async () => {
    const el = await defaultFixture({ checkedValue: "2" })

    expect(el.value).to.deep.equal("2")
  })
})
