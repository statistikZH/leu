import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture } from "../../../test/utils.js"

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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("has a default value of an empty array", async () => {
    const el = await defaultFixture()

    expect(el.value).toEqual([])
  })

  it("updates the value when a checkbox is checked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()

    expect(el.value).toEqual(["2"])
  })

  it("allows multiple checkboxes to be checked", async () => {
    const el = await defaultFixture()
    const leuCheckbox2 = el.querySelector('leu-checkbox[value="2"]')
    const leuCheckbox3 = el.querySelector('leu-checkbox[value="3"]')
    const checkbox2 = leuCheckbox2.shadowRoot.querySelector("input")
    const checkbox3 = leuCheckbox3.shadowRoot.querySelector("input")

    checkbox2.click()
    checkbox3.click()

    expect(el.value).toEqual(["2", "3"])
  })

  it("updates the value when a checkbox is unchecked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()
    checkbox.click()

    expect(el.value).toEqual([])
  })

  it("doesn't update the value when a disabled checkbox is clicked", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="1"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    checkbox.click()

    expect(el.value).toEqual([])
  })

  it("has a default value that reflects all checked checkboxes", async () => {
    const el = await checkedFixture()

    expect(el.value).toEqual(["2"])
  })

  it("delegates focus to the first active checkbox", async () => {
    const el = await defaultFixture()
    const leuCheckbox = el.querySelector('leu-checkbox[value="2"]')
    const checkbox = leuCheckbox.shadowRoot.querySelector("input")

    await userEvent.tab()

    expect(document.activeElement).toBe(leuCheckbox)
    expect(leuCheckbox.shadowRoot.activeElement).toBe(checkbox)
  })
})
