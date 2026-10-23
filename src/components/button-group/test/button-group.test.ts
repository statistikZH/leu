import { html } from "lit"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("has no value by default", async () => {
    const el = await defaultFixture()

    expect(el.value).toBeNull()
  })

  it("has the correct value after clicking a button", async () => {
    const el = await defaultFixture()

    const buttons = Array.from(el.querySelectorAll("leu-button"))

    setTimeout(() => buttons[1].click())
    await oneEvent(el, "input")
    expect(el.value).toBe("Zweierlei")

    setTimeout(() => buttons[0].click())
    await oneEvent(el, "input")
    expect(el.value).toBe("Eins")

    setTimeout(() => buttons[2].click())
    await oneEvent(el, "input")
    expect(el.value).toBe("Drei")

    // Should not change after clicking the same button again
    setTimeout(() => buttons[2].click())
    await new Promise((resolve) => setTimeout(resolve, 100)) // There is no event to wait for so
    expect(el.value).toBe("Drei")
  })

  it("sets the active attribute on the active button", async () => {
    const el = await defaultFixture()
    el.value = "Zweierlei"
    await el.updateComplete

    const buttons = el.querySelectorAll("leu-button")

    expect(buttons[0].active).toBe(false)
    expect(buttons[1].active).toBe(true)
    expect(buttons[2].active).toBe(false)

    buttons[0].click()

    expect(buttons[0].variant).toBe("secondary")
    expect(buttons[1].variant).toBe("secondary")
    expect(buttons[2].variant).toBe("secondary")
  })

  it("sets the menuitemradio role on the buttons", async () => {
    const el = await defaultFixture()
    const buttons = el.querySelectorAll("leu-button")

    expect(buttons[0].componentRole).toBe("menuitemradio")
    expect(buttons[1].componentRole).toBe("menuitemradio")
    expect(buttons[2].componentRole).toBe("menuitemradio")
  })

  it("dispatches an input event when the value changes", async () => {
    const el = await defaultFixture()
    el.value = "Drei"
    await el.updateComplete

    const buttons = el.querySelectorAll("leu-button")

    setTimeout(() => buttons[0].click())

    const inputEvent = await oneEvent(el, "input")

    expect(inputEvent.detail.value).toBe("Eins")
  })
})
