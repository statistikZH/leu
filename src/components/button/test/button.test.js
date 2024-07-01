import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"

import "../leu-button.js"
import "../../icon/leu-icon.js"

async function defaultFixture() {
  return fixture(html` <leu-button>button</leu-button>`)
}

describe("LeuButton", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-button")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with no visible text", async () => {
    const el = await fixture(
      html` <leu-button label="sichern">
        <leu-icon name="download"></leu-icon>
      </leu-button>`
    )

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await fixture(html` <leu-button>Sichern</leu-button>`)

    expect(el).to.have.trimmed.text("Sichern")
  })

  it("sets the aria-label attribute", async () => {
    const el = await fixture(
      html` <leu-button label="Dokument herunterladen"
        ><leu-icon name="download"></leu-icon
      ></leu-button>`
    )
    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("aria-label", "Dokument herunterladen")
  })

  it("renders the icon slots at the correct position", async () => {
    const el = await fixture(
      html` <leu-button
        ><leu-icon name="addBew" slot="before"></leu-icon>Sichern</leu-button
      >`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button><slot name='before'></slot><span><slot></slot></span><slot name='after'></slot></button>",
      { ignoreAttributes: ["class", "type"] }
    )
  })

  it("renders the expanded icon only when the variant is ghost", async () => {
    const el = await fixture(
      html` <leu-button variant="ghost" expanded="true"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button aria-expanded='true'><slot name='before'></slot><span><slot></slot></span><slot name='after'></slot><div class='icon-wrapper icon-wrapper--expanded'><leu-icon name='angleDropDown' size='24'></leu-icon></div></button>",
      { ignoreAttributes: ["class", "type"] }
    )

    el.variant = "primary"

    await elementUpdated(el)

    expect(button).dom.to.equal(
      "<button class='primary regular' aria-expanded='true'><slot name='before'></slot><span><slot></slot></span><slot name='after'></slot></button>",
      { ignoreAttributes: ["class", "type"] }
    )
  })

  it("sets the dissabled attrbiute", async () => {
    const el = await fixture(
      html` <leu-button variant="ghost" expanded="true" disabled>
        <leu-icon name="addNew" slot="before"></leu-icon>
        Sichern
      </leu-button>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("disabled")

    el.disabled = false
    await elementUpdated(el)

    expect(button).to.not.have.attribute("disabled")
  })

  it("reflects the role attribute", async () => {
    const el = await fixture(
      html` <leu-button variant="ghost" componentRole="menuitemradio"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("role", "menuitemradio")
  })

  it("sets the either checked or selected attribute depending on the role", async () => {
    const el = await fixture(
      html` <leu-button variant="ghost" componentRole="menuitemradio" active
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("aria-checked", "true")
    expect(button).to.not.have.attribute("aria-selected")

    el.componentRole = "tab"

    await elementUpdated(el)

    expect(button).to.have.attribute("aria-selected", "true")
    expect(button).to.not.have.attribute("aria-checked")

    el.componentRole = "checkbox"
    el.active = false

    await elementUpdated(el)

    expect(button).to.have.attribute("aria-checked", "false")
    expect(button).to.not.have.attribute("aria-selected")

    el.componentRole = undefined
    el.active = true

    await elementUpdated(el)

    expect(button).to.not.have.attribute("aria-checked")
    expect(button).to.not.have.attribute("aria-selected")
  })

  it("dispatches the click event", async () => {
    const el = await fixture(html` <leu-button>Sichern</leu-button>`)
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())

    const event = await oneEvent(el, "click")

    expect(event).to.exist
  })
})
