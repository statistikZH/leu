import { html } from "lit"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

import "../leu-message.js"
import { LeuMessage } from "../Message.js"
import { LeuIcon } from "../../icon/Icon.js"

async function defaultFixture({ removable = false } = {}): Promise<LeuMessage> {
  return fixture(
    html`<leu-message ?removable=${removable}>
      <strong>Entscheid wurde auf den 21.12.2024 verschoben</strong><br />
      Aufgrund ausstehender Abklärungen wurde der Termin verschoben.
    </leu-message>`,
  )
}

describe("LeuMessage", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-message")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the message content", async () => {
    const el = await defaultFixture()

    expect(el).toMatchTextContent(
      "Entscheid wurde auf den 21.12.2024 verschoben",
    )

    expect(el).toMatchTextContent(
      "Aufgrund ausstehender Abklärungen wurde der Termin verschoben.",
    )
  })

  it("renders the remove button according to its 'removable' property", async () => {
    const el = await defaultFixture({ removable: true })

    let removeButton = el.shadowRoot?.querySelector(".message__remove")

    expect(removeButton).toBeTruthy()

    el.removable = false
    await el.updateComplete

    removeButton = el.shadowRoot?.querySelector(".message__remove")

    expect(removeButton).toBeFalsy()
  })

  it("dispatches 'leu:remove' event when remove button is clicked", async () => {
    const el = await defaultFixture({ removable: true })

    const button = el.shadowRoot?.querySelector(
      ".message__remove",
    ) as HTMLButtonElement

    setTimeout(() => button.click())

    const event = await oneEvent(el, "leu:remove", false)

    expect(event).toBeTruthy()
  })

  it("renders the correct icon based on the type", async () => {
    const el = await defaultFixture()

    const icon = el.shadowRoot?.querySelector(".message__icon") as LeuIcon

    expect(icon).toBeTruthy()

    el.type = "success"
    await el.updateComplete

    expect(icon.name).toBe("confirm")

    el.type = "error"
    await el.updateComplete

    expect(icon.name).toBe("caution")

    el.type = "info"
    await el.updateComplete

    expect(icon.name).toBe("getInformation")

    el.type = "warning"
    await el.updateComplete

    expect(icon.name).toBe("caution")
  })
})
