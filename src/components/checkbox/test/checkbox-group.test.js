import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-checkbox.js"
import "../leu-checkbox-group.js"

async function defaultFixture() {
  return fixture(html`
    <leu-checkbox-group>
      <leu-checkbox value="1" disabled>Option 1</leu-checkbox>
      <leu-checkbox value="2">Option 2</leu-checkbox>
      <leu-checkbox value="3">Option 3</leu-checkbox>
    </leu-checkbox-group>
  `)
}

async function checkedFixture() {
  return fixture(html`
    <leu-checkbox-group>
      <leu-checkbox value="1" disabled>Option 1</leu-checkbox>
      <leu-checkbox value="2" checked>Option 2</leu-checkbox>
      <leu-checkbox value="3">Option 3</leu-checkbox>
    </leu-checkbox-group>
  `)
}

describe("LeuCheckboxGroup", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-checkbox-group")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("has a default value of an empty array", async () => {
    const el = await defaultFixture()

    expect(el.value).to.deep.equal([])
  })

  it("updates the value when a checkbox is checked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()

    expect(el.value).to.deep.equal(["2"])
  })

  it("allows multiple checkboxes to be checked", async () => {
    const el = await defaultFixture()
    const leuCheckbox2 = el.querySelector('leu-checkbox[value="2"]')
    const leuCheckbox3 = el.querySelector('leu-checkbox[value="3"]')
    const checkbox2 = leuCheckbox2.shadowRoot.querySelector("input")
    const checkbox3 = leuCheckbox3.shadowRoot.querySelector("input")

    checkbox2.click()
    checkbox3.click()

    expect(el.value).to.deep.equal(["2", "3"])
  })

  it("updates the value when a checkbox is unchecked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()
    checkbox.click()

    expect(el.value).to.deep.equal([])
  })

  it("doesn't update the value when a disabled checkbox is clicked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="1"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()

    expect(el.value).to.deep.equal([])
  })

  it("has a default value that reflects all checked checkboxes", async () => {
    const el = await checkedFixture()

    expect(el.value).to.deep.equal(["2"])
  })

  it("delegates focus to the first active checkbox", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    await sendKeys({
      press: "Tab",
    })

    expect(document.activeElement).to.equal(leuCheckbox)
    expect(leuCheckbox.shadowRoot.activeElement).to.equal(checkbox)
  })
})
