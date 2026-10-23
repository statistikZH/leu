import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

import "../leu-checkbox.js"
import type { LeuCheckbox } from "../leu-checkbox.js"

async function defaultFixture() {
  return fixture<LeuCheckbox>(html`
    <leu-checkbox value="2">Das ist ein Label</leu-checkbox>
  `)
}

describe("LeuCheckbox", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-checkbox")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("is not checked by default", async () => {
    const el = await defaultFixture()

    expect(el.checked).toBe(false)
  })

  it("toggles the checked property when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")
    const label = el.shadowRoot.querySelector("label")

    checkbox.click()
    await el.updateComplete

    expect(el.checked).toBe(true)

    label.click()
    await el.updateComplete

    expect(el.checked).toBe(false)
  })

  it("does not toggle the checked property when disabled", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")
    const label = el.shadowRoot.querySelector("label")

    el.disabled = true
    await el.updateComplete

    checkbox.click()
    await el.updateComplete

    expect(el.checked).toBe(false)

    label.click()
    await el.updateComplete

    expect(el.checked).toBe(false)
  })

  it("toggles the checked property when the space key is pressed", async () => {
    const el = await defaultFixture()
    el.focus()

    await userEvent.keyboard(" ")

    expect(el.checked).toBe(true)

    await userEvent.keyboard(" ")

    expect(el.checked).toBe(false)
  })

  it("fires a change event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "change", false)

    expect(event).toBeTruthy()
  })

  it("fires an input event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "input", false)

    expect(event).toBeTruthy()
  })

  it("appends the value to the form data when checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("2")
  })

  it("appends 'on' to the form data when checked and no value is set", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" checked></leu-checkbox>
      </form>
    `)

    let formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("on")

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.value = ""
    await checkbox.updateComplete

    formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("")
  })

  it("does not append the value to the form data when unchecked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2"></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()
  })

  it("does not append the value to the form data when disabled", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked disabled></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()
  })

  it("resets to the default checked state when the form is reset", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked></leu-checkbox>
        <button type="reset">Reset</button>
      </form>
    `)

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.checked = false
    await checkbox.updateComplete

    form.reset()
    await checkbox.updateComplete

    expect(checkbox.checked).toBe(true)
  })

  it("updates the form data when the value and disabled state changes", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2"></leu-checkbox>
      </form>
    `)

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.checked = true
    await checkbox.updateComplete

    let formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("2")

    checkbox.value = "another_value"
    await checkbox.updateComplete

    formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("another_value")

    checkbox.disabled = true
    await checkbox.updateComplete

    formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()
  })

  it("updates the form data when the defaultChecked state changes before any interaction", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked></leu-checkbox>
      </form>
    `)

    // Reset the default value to unchecked. Should have an effect since the user has not interacted with the checkbox yet.
    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.defaultChecked = false
    await checkbox.updateComplete

    let formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()

    // Simulate user interaction by clicking the checkbox, which should check it and update the form data.
    const innerCheckbox =
      checkbox.shadowRoot.querySelector<HTMLInputElement>("input")
    innerCheckbox.click()

    await checkbox.updateComplete

    formData = new FormData(form)
    expect(formData.get("checkbox")).toBe("2")

    // This change of defaultChecked should not have an effect since the user has already interacted with the checkbox.
    checkbox.defaultChecked = true
    checkbox.checked = false
    await checkbox.updateComplete

    formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()
  })

  it("is not indeterminate by default", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    expect(el.indeterminate).toBe(false)
    expect(checkbox.indeterminate).toBe(false)
  })

  it("reflects the indeterminate property to the native input and the attribute", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    el.indeterminate = true
    await el.updateComplete

    expect(el.hasAttribute("indeterminate")).toBe(true)
    expect(checkbox.indeterminate).toBe(true)
  })

  it("passes the a11y audit when indeterminate", async () => {
    const el = await defaultFixture()

    el.indeterminate = true
    await el.updateComplete

    expect(await axe(el)).toHaveNoViolations()
  })

  it("clears the indeterminate state when clicked, while still toggling checked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    el.indeterminate = true
    await el.updateComplete

    checkbox.click()
    await el.updateComplete

    expect(el.indeterminate).toBe(false)
    expect(checkbox.indeterminate).toBe(false)
    expect(el.checked).toBe(true)
  })

  it("clears the indeterminate state when toggled via the space key", async () => {
    const el = await defaultFixture()
    el.indeterminate = true
    await el.updateComplete

    el.focus()
    await userEvent.keyboard(" ")

    expect(el.indeterminate).toBe(false)
    expect(el.checked).toBe(true)
  })

  it("does not affect the form data when indeterminate", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" indeterminate></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).toBeNull()
  })

  it("should be invalid when the required attribute is set and not checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" required></leu-checkbox>
      </form>
    `)

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")

    expect(checkbox.validity.valid).toBe(false)
    expect(form.checkValidity()).toBe(false)
  })
})
