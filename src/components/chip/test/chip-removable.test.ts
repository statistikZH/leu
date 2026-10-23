import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture, oneEvent } from "../../../test/utils.js"
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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el.textContent.trim()).toBe("Daten")
  })

  it("renders a button element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("button")).toBeTruthy()
  })

  it("renders a remove icon", async () => {
    const el = await defaultFixture()

    const iconPath = el.shadowRoot.querySelector("leu-icon")

    expect(iconPath.name).toBe("close")
  })

  it("delegates the focus to the button element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("button")).toBe(
      el.shadowRoot.activeElement,
    )
  })

  it("fires a remove event when the button is clicked", async () => {
    const el = await defaultFixture()
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "leu:remove")

    expect(event).toBeTruthy()
  })

  it("fires a remove event when the enter key is pressed", async () => {
    const el = await defaultFixture()

    el.focus()
    const eventPromise = oneEvent(el, "leu:remove")
    await userEvent.keyboard("{Enter}")
    const event = await eventPromise

    expect(event).toBeTruthy()
  })

  it("sends the value in the remove event", async () => {
    const el = await defaultFixture({ label: `Daten              ` })
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())
    const event = await oneEvent(el, "leu:remove")

    expect(event.detail.value).toBe("Daten")

    el.value = "test"

    setTimeout(() => button.click())
    const event2 = await oneEvent(el, "leu:remove")

    expect(event2.detail.value).toBe("test")
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture({ label: `Daten              ` })

    expect(el.getValue()).toBe("Daten")

    el.value = "daten-01"

    expect(el.getValue()).toBe("daten-01")
  })
})
