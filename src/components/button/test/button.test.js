import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"

import "../leu-button.js"

async function defaultFixture() {
  return fixture(html` <leu-button label="button"></leu-button>`)
}

describe("LeuButton", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-button")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await fixture(html` <leu-button label="Sichern"></leu-button>`)
    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.trimmed.text("Sichern")
  })

  it("renders the icon at the correct position", async () => {
    const el = await fixture(
      html` <leu-button icon="addNew" label="Sichern"></leu-button>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button><div><svg><path /></svg></div>Sichern</div>",
      { ignoreAttributes: ["d", "class", "type"] }
    )

    el.iconPosition = "after"

    await elementUpdated(el)

    expect(button).dom.to.equal(
      "<button>Sichern<div><svg><path /></svg></div></div>",
      { ignoreAttributes: ["d", "class", "type"] }
    )
  })

  it("renders the icon at the correct size", async () => {
    const el = await fixture(
      html` <leu-button icon="addNew" label="Sichern"></leu-button>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button><div><svg width='24' height='24'><path /></svg></div>Sichern</div>",
      { ignoreAttributes: ["d", "class", "type"] }
    )

    el.size = "small"

    await elementUpdated(el)

    expect(button).dom.to.equal(
      "<button><div><svg width='16' height='16'><path /></svg></div>Sichern</div>",
      { ignoreAttributes: ["d", "class", "type"] }
    )
  })

  it("renders the expanded icon only when the variant is ghost", async () => {
    const el = await fixture(
      html` <leu-button
        icon="addNew"
        label="Sichern"
        variant="ghost"
        expanded="open"
      ></leu-button>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button class='ghost normal'><div class='icon-wrapper icon-wrapper--before'><svg width='24' height='24'><path /></svg></div>Sichern<div class='icon-wrapper icon-wrapper--expanded'><svg width='24' height='24'><path /></svg></div></div>",
      { ignoreAttributes: ["d", "type", "width", "height"] }
    )

    el.variant = "primary"

    await elementUpdated(el)

    expect(button).dom.to.equal(
      "<button class='primary normal'><div class='icon-wrapper icon-wrapper--before'><svg width='24' height='24'><path /></svg></div>Sichern</div>",
      { ignoreAttributes: ["d", "type"] }
    )
  })

  it("sets the dissabled attrbiute", async () => {
    const el = await fixture(
      html` <leu-button
        icon="addNew"
        label="Sichern"
        variant="ghost"
        expanded="open"
        disabled
      ></leu-button>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("disabled")

    el.disabled = false
    await elementUpdated(el)

    expect(button).to.not.have.attribute("disabled")
  })

  it("dispatches the click event", async () => {
    const el = await fixture(html` <leu-button label="Sichern"></leu-button>`)
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())

    const event = await oneEvent(el, "click")

    expect(event).to.exist
  })
})
