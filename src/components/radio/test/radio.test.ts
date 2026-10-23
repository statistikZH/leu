import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

import "../leu-radio.js"

async function defaultFixture() {
  return fixture(html`
    <leu-radio identifier="b" value="3" name="radio-button"
      >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
    >
  `)
}

describe("LeuRadio", () => {
  it("is a defined element", async () => {
    const elRadio = customElements.get("leu-radio")

    expect(elRadio).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("is not checked by default", async () => {
    const el = await defaultFixture()

    expect(el.checked).toBe(false)
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    checkbox.click()
    await el.updateComplete

    expect(el.checked).toBe(true)

    checkbox.click()
    await el.updateComplete

    expect(el.checked).toBe(true)
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const label = el.shadowRoot.querySelector("label")

    label.click()
    await el.updateComplete

    expect(el.checked).toBe(true)

    label.click()
    await el.updateComplete

    expect(el.checked).toBe(true)
  })

  it("does not set the checked property when disabled", async () => {
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

    expect(el.checked).toBe(true)
  })

  it("fires a change event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "change")

    expect(event).toBeTruthy()
  })

  it("fires an input event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "input")

    expect(event).toBeTruthy()
  })
})
