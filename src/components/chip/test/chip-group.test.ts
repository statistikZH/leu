import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"

import "../leu-chip-selectable.js"
import "../leu-chip-removable.js"
import { LeuChipGroup } from "../leu-chip-group.js"

async function removableFixture() {
  return fixture(html`
    <leu-chip-group>
      <leu-chip-removable>Publikationen</leu-chip-removable>
      <leu-chip-removable value="2">Daten</leu-chip-removable>
      <leu-chip-removable value="3">Schnittstellen</leu-chip-removable>
    </leu-chip-group>
  `)
}

async function singleSelectionFixture() {
  return fixture<LeuChipGroup>(html`
    <leu-chip-group selection-mode="single">
      <leu-chip-selectable value="1" variant="radio"
        >Publikationen</leu-chip-selectable
      >
      <leu-chip-selectable value="2" variant="radio">Daten</leu-chip-selectable>
      <leu-chip-selectable value="3" variant="radio"
        >Schnittstellen</leu-chip-selectable
      >
    </leu-chip-group>
  `)
}

async function multipleSelectionFixture() {
  return fixture<LeuChipGroup>(html`
    <leu-chip-group selection-mode="multiple">
      <leu-chip-selectable value="1">Publikationen</leu-chip-selectable>
      <leu-chip-selectable value="2">Daten</leu-chip-selectable>
      <leu-chip-selectable value="3">Schnittstellen</leu-chip-selectable>
    </leu-chip-group>
  `)
}

describe("LeuChipGroup", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-selectable")

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

  it("checks only chip when the value of the group is set (selection-mode=single)", async () => {
    const el = await singleSelectionFixture()
    const items = el.querySelectorAll("leu-chip-selectable")

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false

    el.value = ["2"]

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.true
    expect(items[2].checked).to.be.false

    // Should check the first item with the given value and not first item of the value list
    el.value = ["2", "1"]

    expect(items[0].checked).to.be.true
    expect(items[1].checked).to.be.false

    el.value = []

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false

    el.value = ["asdf"]

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false
    expect(el.value).to.deep.equal([])
  })

  it("checks chips when the value of the group is set (selection-mode=multiple)", async () => {
    const el = await multipleSelectionFixture()
    const items = el.querySelectorAll("leu-chip-selectable")

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false

    el.value = ["2"]

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.true
    expect(items[2].checked).to.be.false

    // Should check the first item with the given value and not first item of the value list
    el.value = ["2", "1"]

    expect(items[0].checked).to.be.true
    expect(items[1].checked).to.be.true
    expect(items[2].checked).to.be.false

    el.value = []

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false

    el.value = ["asdf"]

    expect(items[0].checked).to.be.false
    expect(items[1].checked).to.be.false
    expect(items[2].checked).to.be.false
    expect(el.value).to.deep.equal([])
  })
})
