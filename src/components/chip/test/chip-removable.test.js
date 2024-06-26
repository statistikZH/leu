import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-chip-removable.js"

async function defaultFixture() {
  return fixture(html` <leu-chip-removable>Daten</leu-chip-removable> `)
}

describe("LeuChipRemovable", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-removable")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el).to.have.trimmed.text("Daten")
  })

  it("renders a button element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("button")).to.exist
  })

  it("renders a remove icon", async () => {
    const el = await defaultFixture()

    const iconPath = el.shadowRoot.querySelector("leu-icon")

    expect(iconPath.name).to.equal("close")
  })

  it("delegates the focus to the button element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("button")).to.equal(
      el.shadowRoot.activeElement
    )
  })

  it("fires a remove event when the button is clicked", async () => {
    const el = await defaultFixture()
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "leu:remove")

    expect(event).to.exist
  })

  it("fires a remove event when the enter key is pressed", async () => {
    const el = await defaultFixture()

    el.focus()
    setTimeout(() => sendKeys({ press: "Enter" }))
    const event = await oneEvent(el, "leu:remove")

    expect(event).to.exist
  })
})
