import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-radio.js"

async function defaultFixture() {
  return fixture(html`
    <leu-radio
      identifier="b"
      value="3"
      name="radio-button"
      label="Ein langes Label um sicher ein umbruch zu erzwingen"
    ></leu-radio>
  `)
}

describe("LeuRadio", () => {
  it("is a defined element", async () => {
    const elRadio = customElements.get("leu-radio")

    await expect(elRadio).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("is not checked by default", async () => {
    const el = await defaultFixture()

    expect(el.checked).to.be.false
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const label = el.shadowRoot.querySelector("label")

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true
  })

  it("does not set the checked property when disabled", async () => {
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

    expect(el.checked).to.be.true
  })

  it("fires a change event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "change")

    expect(event).to.exist
  })

  it("fires an input event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "input")

    expect(event).to.exist
  })
})
