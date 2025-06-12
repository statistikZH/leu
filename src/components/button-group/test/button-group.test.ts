import { html } from "lit"
import {
  fixture,
  expect,
  oneEvent,
  elementUpdated,
  aTimeout,
} from "@open-wc/testing"

import "../leu-button-group.js"
import "../../button/leu-button.js"

async function defaultFixture() {
  return fixture(html`
    <leu-button-group>
      <leu-button variant="secondary" value="Eins">Eins</leu-button>
      <leu-button variant="secondary" value="Zweierlei">Zwei</leu-button>
      <leu-button variant="secondary">Drei</leu-button>
    </leu-button-group>
  `)
}

describe("LeuButtonGroup", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-button-group")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).to.be.accessible()
  })

  it("has no value by default", async () => {
    const el = await defaultFixture()

    await expect(el.value).to.be.null
  })

  it("has the correct value after clicking a button", async () => {
    const el = await defaultFixture()

    const buttons = Array.from(el.querySelectorAll("leu-button"))

    setTimeout(() => buttons[1].click())
    await oneEvent(el, "input")
    await expect(el.value).to.equal("Zweierlei")

    setTimeout(() => buttons[0].click())
    await oneEvent(el, "input")
    await expect(el.value).to.equal("Eins")

    setTimeout(() => buttons[2].click())
    await oneEvent(el, "input")
    await expect(el.value).to.equal("Drei")

    // Should not change after clicking the same button again
    setTimeout(() => buttons[2].click())
    await aTimeout(100) // There is no event to wait for so
    await expect(el.value).to.equal("Drei")
  })

  it("sets the active attribute on the active button", async () => {
    const el = await defaultFixture()
    el.value = "Zweierlei"
    await elementUpdated(el)

    const buttons = el.querySelectorAll("leu-button")

    await expect(buttons[0].active).to.be.false
    await expect(buttons[1].active).to.be.true
    await expect(buttons[2].active).to.be.false

    buttons[0].click()

    await expect(buttons[0].variant).to.equal("secondary")
    await expect(buttons[1].variant).to.equal("secondary")
    await expect(buttons[2].variant).to.equal("secondary")
  })

  it("sets the menuitemradio role on the buttons", async () => {
    const el = await defaultFixture()
    const buttons = el.querySelectorAll("leu-button")

    await expect(buttons[0].componentRole).to.equal("menuitemradio")
    await expect(buttons[1].componentRole).to.equal("menuitemradio")
    await expect(buttons[2].componentRole).to.equal("menuitemradio")
  })

  it("dispatches an input event when the value changes", async () => {
    const el = await defaultFixture()
    el.value = "Drei"
    await elementUpdated(el)

    const buttons = el.querySelectorAll("leu-button")

    setTimeout(() => buttons[0].click())

    const inputEvent = await oneEvent(el, "input")

    await expect(inputEvent.detail.value).to.be.equal("Eins")
  })
})
