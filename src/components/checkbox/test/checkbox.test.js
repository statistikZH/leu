import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../../../exports/define/checkbox.js"
import "../../../exports/define/checkbox-group.js"

async function defaultFixture() {
  return fixture(html`
    <leu-checkbox-group>
      <leu-checkbox identifier="a" value="1" disabled>1</leu-checkbox>
      <leu-checkbox identifier="b" value="2">2</leu-checkbox>
      <leu-checkbox identifier="c" value="3">3</leu-checkbox>
    </leu-checkbox-group>
  `)
}

async function checkedFixture() {
  return fixture(html`
    <leu-checkbox-group>
      <leu-checkbox identifier="a" value="1" disabled>1</leu-checkbox>
      <leu-checkbox identifier="b" value="2" checked>2</leu-checkbox>
      <leu-checkbox identifier="c" value="3">3</leu-checkbox>
    </leu-checkbox-group>
  `)
}

describe("LeuCheckbox", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-checkbox")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  describe("LeuCheckboxGroup", () => {
    it("is a defined element", async () => {
      const el = await customElements.get("leu-checkbox-group")

      await expect(el).not.to.be.undefined
    })

    it("should have a default value of an empty array", async () => {
      const el = await defaultFixture()

      expect(el.value).to.deep.equal([])
    })

    it("should update the value when a checkbox is checked", async () => {
      const el = await defaultFixture()
      const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
      const checkbox = leuCheckbox.shadowRoot.querySelector("input")

      checkbox.click()

      expect(el.value).to.deep.equal(["2"])
    })

    it("should update the value when a checkbox is unchecked", async () => {
      const el = await defaultFixture()
      const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
      const checkbox = leuCheckbox.shadowRoot.querySelector("input")

      checkbox.click()
      checkbox.click()

      expect(el.value).to.deep.equal([])
    })

    it("should not update the value when a disabled checkbox is clicked", async () => {
      const el = await defaultFixture()
      const leuCheckbox = el.querySelector('leu-checkbox[value="1"]')
      const checkbox = leuCheckbox.shadowRoot.querySelector("input")

      checkbox.click()

      expect(el.value).to.deep.equal([])
    })

    it("should have the option checked by default as a value", async () => {
      const el = await checkedFixture()

      expect(el.value).to.deep.equal(["2"])
    })
  })
})
