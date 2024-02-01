import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-checkbox.js"

async function defaultFixture() {
  return fixture(html`
    <leu-checkbox
      identifier="b"
      value="2"
      label="Das ist ein Label"
    ></leu-checkbox>
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

  it("applies the identifier to the input and the label", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("input").id).to.equal("b")
    expect(el.shadowRoot.querySelector("label").htmlFor).to.equal("b")
  })
})
