import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"

import { LeuMessage } from "../leu-message.js"
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

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the message content", async () => {
    const el = await defaultFixture()

    expect(el).to.contain.text("Entscheid wurde auf den 21.12.2024 verschoben")

    expect(el).to.contain.text(
      "Aufgrund ausstehender Abklärungen wurde der Termin verschoben.",
    )
  })

  it("renders the remove button according to its 'removable' property", async () => {
    const el = await defaultFixture({ removable: true })

    let removeButton = el.shadowRoot?.querySelector(".message__remove")

    expect(removeButton).to.exist

    el.removable = false
    await el.updateComplete

    removeButton = el.shadowRoot?.querySelector(".message__remove")

    expect(removeButton).to.not.exist
  })

  it("dispatches 'leu:remove' event when remove button is clicked", async () => {
    const el = await defaultFixture({ removable: true })

    const button = el.shadowRoot?.querySelector(
      ".message__remove",
    ) as HTMLButtonElement

    setTimeout(() => button.click())

    const event = await oneEvent(el, "leu:remove", false)

    expect(event).to.exist
  })

  it("renders the correct icon based on the type", async () => {
    const el = await defaultFixture()

    const icon = el.shadowRoot?.querySelector(".message__icon") as LeuIcon

    expect(icon).to.exist

    el.type = "success"
    await el.updateComplete

    expect(icon.name).to.equal("confirm")

    el.type = "error"
    await el.updateComplete

    expect(icon.name).to.equal("caution")

    el.type = "info"
    await el.updateComplete

    expect(icon.name).to.equal("getInformation")

    el.type = "warning"
    await el.updateComplete

    expect(icon.name).to.equal("caution")
  })
})
