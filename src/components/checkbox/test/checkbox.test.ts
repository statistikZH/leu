import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

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

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("is not checked by default", async () => {
    const el = await defaultFixture()

    expect(el.checked).to.be.false
  })

  it("toggles the checked property when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")
    const label = el.shadowRoot.querySelector("label")

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.false
  })

  it("does not toggle the checked property when disabled", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")
    const label = el.shadowRoot.querySelector("label")

    el.disabled = true
    await elementUpdated(el)

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.false

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.false
  })

  it("toggles the checked property when the space key is pressed", async () => {
    const el = await defaultFixture()
    el.focus()

    await sendKeys({
      press: "Space",
    })

    expect(el.checked).to.be.true

    await sendKeys({
      press: "Space",
    })

    expect(el.checked).to.be.false
  })

  it("fires a change event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "change", false)

    expect(event).to.exist
  })

  it("fires an input event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "input", false)

    expect(event).to.exist
  })

  it("appends the value to the form data when checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).to.equal("2")
  })

  it("appends 'on' to the form data when checked and no value is set", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" checked></leu-checkbox>
      </form>
    `)

    let formData = new FormData(form)
    expect(formData.get("checkbox")).to.equal("on")

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.value = ""
    await elementUpdated(checkbox)

    formData = new FormData(form)
    expect(formData.get("checkbox")).to.equal("")
  })

  it("does not append the value to the form data when unchecked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2"></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.null
  })

  it("does not append the value to the form data when disabled", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" checked disabled></leu-checkbox>
      </form>
    `)

    const formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.null
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
    await elementUpdated(checkbox)

    form.reset()
    await elementUpdated(checkbox)

    expect(checkbox.checked).to.be.true
  })

  it("updates the form data when the value and disabled state changes", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2"></leu-checkbox>
      </form>
    `)

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")
    checkbox.checked = true
    await elementUpdated(checkbox)

    let formData = new FormData(form)
    expect(formData.get("checkbox")).to.equal("2")

    checkbox.value = "another_value"
    await elementUpdated(checkbox)

    formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.equal("another_value")

    checkbox.disabled = true
    await elementUpdated(checkbox)

    formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.null
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
    await elementUpdated(checkbox)

    let formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.null

    // Simulate user interaction by clicking the checkbox, which should check it and update the form data.
    const innerCheckbox =
      checkbox.shadowRoot.querySelector<HTMLInputElement>("input")
    innerCheckbox.click()

    await elementUpdated(checkbox)

    formData = new FormData(form)
    expect(formData.get("checkbox")).to.equal("2")

    // This change of defaultChecked should not have an effect since the user has already interacted with the checkbox.
    checkbox.defaultChecked = true
    checkbox.checked = false
    await elementUpdated(checkbox)

    formData = new FormData(form)
    expect(formData.get("checkbox")).to.be.null
  })

  it("should be invalid when the required attribute is set and not checked", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-checkbox name="checkbox" value="2" required></leu-checkbox>
      </form>
    `)

    const checkbox = form.querySelector<LeuCheckbox>("leu-checkbox")

    expect(checkbox.validity.valid).to.be.false
    expect(form.checkValidity()).to.be.false
  })
})
