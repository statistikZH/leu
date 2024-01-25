import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"

import "../leu-chip-selectable.js"
import "../leu-chip-removable.js"
import "../leu-chip-group.js"

async function removableFixture() {
  return fixture(
    html`
      <leu-chip-group>
        <leu-chip-removable label="Publikationen"></leu-chip-removable>
        <leu-chip-removable label="Daten" value="2"></leu-chip-removable>
        <leu-chip-removable
          label="Schnittstellen"
          value="3"
        ></leu-chip-removable>
      </leu-chip-group>
    `
  )
}

async function singleSelectionFixture() {
  return fixture(
    html`
      <leu-chip-group selection-mode="single">
        <leu-chip-selectable
          label="Publikationen"
          value="1"
          variant="radio"
        ></leu-chip-selectable>
        <leu-chip-selectable
          label="Daten"
          value="2"
          variant="radio"
        ></leu-chip-selectable>
        <leu-chip-selectable
          label="Schnittstellen"
          value="3"
          variant="radio"
        ></leu-chip-selectable>
      </leu-chip-group>
    `
  )
}

async function multipleSelectionFixture() {
  return fixture(
    html`
      <leu-chip-group selection-mode="multiple">
        <leu-chip-selectable
          label="Publikationen"
          value="1"
        ></leu-chip-selectable>
        <leu-chip-selectable label="Daten" value="2"></leu-chip-selectable>
        <leu-chip-selectable
          label="Schnittstellen"
          value="3"
        ></leu-chip-selectable>
      </leu-chip-group>
    `
  )
}

describe("LeuChipGroup", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-chip-selectable")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit with removable chips", async () => {
    const el = await removableFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with selectable chips", async () => {
    const el = await multipleSelectionFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with selectable radio chips", async () => {
    const el = await singleSelectionFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("updates the value when a chip is selected", async () => {
    const el = await singleSelectionFixture()
    const chip = el.querySelector("leu-chip-selectable")
    const chipButton = chip.shadowRoot.querySelector("button")
    chipButton.click()

    await expect(el.value).to.deep.equal(["1"])
  })

  it("updates the value when multiple chips are selected", async () => {
    const el = await multipleSelectionFixture()
    const chips = el.querySelectorAll("leu-chip-selectable")
    const chipButton2 = chips[1].shadowRoot.querySelector("button")
    const chipButton3 = chips[2].shadowRoot.querySelector("button")

    chipButton2.click()
    chipButton3.click()

    await expect(el.value).to.deep.equal(["2", "3"])
  })

  it("fires an input event when a chip is selected", async () => {
    const el = await singleSelectionFixture()
    const chip = el.querySelector("leu-chip-selectable")
    const chipButton = chip.shadowRoot.querySelector("button")

    setTimeout(() => {
      chipButton.click()
    }, 0)

    const event = await oneEvent(el, "input")

    await expect(event).to.exist
  })
})
