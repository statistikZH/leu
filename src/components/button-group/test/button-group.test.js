import { html } from "lit"
import { fixture, expect, oneEvent, elementUpdated } from "@open-wc/testing"

import "../leu-button-group.js"

const items = ["Eins", "Zwei", "Drei"]

async function defaultFixture() {
  return fixture(html` <leu-button-group .items=${items}></leu-button-group> `)
}

describe("LeuButtonGroup", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-button-group")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("has no value by default", async () => {
    const el = await defaultFixture()

    await expect(el.value).to.be.null
  })

  it("has the correct value after clicking a button", async () => {
    const el = await defaultFixture()

    const buttons = el.shadowRoot.querySelectorAll("leu-button")

    buttons[1].click()
    await expect(el.value).to.equal("Zwei")

    buttons[0].click()
    await expect(el.value).to.equal("Eins")

    buttons[2].click()
    await expect(el.value).to.equal("Drei")

    // Should not change after clicking the same button again
    buttons[2].click()
    await expect(el.value).to.equal("Drei")
  })

  it("renders the active button as a primary button", async () => {
    const el = await defaultFixture()
    el.value = "Zwei"
    await elementUpdated(el)

    const buttons = el.shadowRoot.querySelectorAll("leu-button")

    await expect(buttons[0].variant).to.equal("secondary")
    await expect(buttons[1].variant).to.equal("primary")
    await expect(buttons[2].variant).to.equal("secondary")

    buttons[0].click()

    await expect(buttons[0].variant).to.equal("secondary")
    await expect(buttons[1].variant).to.equal("secondary")
    await expect(buttons[2].variant).to.equal("secondary")
  })

  it("sets the correct aria-checked attribute", async () => {
    const el = await defaultFixture()
    el.value = "Drei"
    await elementUpdated(el)

    const buttons = el.shadowRoot.querySelectorAll("leu-button")

    await expect(buttons[0].getAttribute("aria-checked")).to.equal("false")
    await expect(buttons[1].getAttribute("aria-checked")).to.equal("false")
    await expect(buttons[2].getAttribute("aria-checked")).to.equal("true")

    buttons[0].click()
    await expect(buttons[0].getAttribute("aria-checked")).to.equal("false")
    await expect(buttons[1].getAttribute("aria-checked")).to.equal("false")
    await expect(buttons[2].getAttribute("aria-checked")).to.equal("false")
  })

  it("dispatches an input event when the value changes", async () => {
    const el = await defaultFixture()
    el.value = "Drei"
    await elementUpdated(el)

    const buttons = el.shadowRoot.querySelectorAll("leu-button")

    setTimeout(() => buttons[0].click())

    const inputEvent = await oneEvent(el, "input")

    await expect(inputEvent.detail.value).to.be.equal("Eins")
  })
})
