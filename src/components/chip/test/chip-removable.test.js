import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-removable.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-chip-removable value=${ifDefined(args.value)}
      >${args.label ?? "Daten"}</leu-chip-removable
    >
  `)
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
      el.shadowRoot.activeElement,
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

  it("sends the value in the remove event", async () => {
    const el = await defaultFixture({ label: `Daten              ` }) // eslint-disable-line no-irregular-whitespace
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "leu:remove")

    expect(event.detail.value).to.equal("Daten")

    el.value = "test"

    setTimeout(() => button.click())
    const event2 = await oneEvent(el, "leu:remove")

    expect(event2.detail.value).to.equal("test")
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture({ label: `Daten              ` }) // eslint-disable-line no-irregular-whitespace

    expect(el.getValue()).to.equal("Daten")

    el.value = "daten-01"

    expect(el.getValue()).to.equal("daten-01")
  })
})
