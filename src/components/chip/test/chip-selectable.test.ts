import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture, oneEvent } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el.textContent.trim()).toBe("Publikationen")
  })

  it("renders a button element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("button")).toBeTruthy()
  })

  it("delegates the focus to the button element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("button")).toBe(
      el.shadowRoot.activeElement,
    )
  })

  it("fires a input event when the button is clicked", async () => {
    const el = await defaultFixture()
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "input")

    expect(event).toBeTruthy()
  })

  it("fires a input event when the enter key is pressed", async () => {
    const el = await defaultFixture()

    el.focus()
    const eventPromise = oneEvent(el, "input")
    await userEvent.keyboard("{Enter}")
    const event = await eventPromise

    expect(event).toBeTruthy()
  })

  it("removes the checked state when the button is clicked", async () => {
    const el = await defaultFixture({ checked: true })
    const button = el.shadowRoot.querySelector("button")

    button.click()

    expect(el.checked).toBe(false)
  })

  it("doesn't remove the checked state of a checked radio chip", async () => {
    const el = await defaultFixture({ variant: "radio", checked: true })

    const button = el.shadowRoot.querySelector("button")
    button.click()

    expect(el.checked).toBe(true)
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture()

    expect(el.getValue()).toBe("Publikationen")

    el.value = "publikationen-01"

    expect(el.getValue()).toBe("publikationen-01")
  })
})
