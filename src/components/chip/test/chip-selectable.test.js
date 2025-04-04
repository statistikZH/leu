import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-chip-selectable.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-chip-selectable
      value=${ifDefined(args.value)}
      variant=${ifDefined(args.variant)}
      ?checked=${args.checked}
      >Publikationen</leu-chip-selectable
    >
  `)
}

describe("LeuChipSelectable", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-selectable")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el).to.have.trimmed.text("Publikationen")
  })

  it("renders a button element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("button")).to.exist
  })

  it("delegates the focus to the button element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("button")).to.equal(
      el.shadowRoot.activeElement,
    )
  })

  it("fires a input event when the button is clicked", async () => {
    const el = await defaultFixture()
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "input")

    expect(event).to.exist
  })

  it("fires a input event when the enter key is pressed", async () => {
    const el = await defaultFixture()

    el.focus()
    setTimeout(() => sendKeys({ press: "Enter" }))
    const event = await oneEvent(el, "input")

    expect(event).to.exist
  })

  it("removes the checked state when the button is clicked", async () => {
    const el = await defaultFixture({ checked: true })
    const button = el.shadowRoot.querySelector("button")

    button.click()

    expect(el.checked).to.be.false
  })

  it("doesn't remove the checked state of a checked radio chip", async () => {
    const el = await defaultFixture({ variant: "radio", checked: true })

    const button = el.shadowRoot.querySelector("button")
    button.click()

    expect(el.checked).to.be.true
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture()

    expect(el.getValue()).to.equal("Publikationen")

    el.value = "publikationen-01"

    expect(el.getValue()).to.equal("publikationen-01")
  })
})
