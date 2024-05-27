import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { ifDefined } from "lit/directives/if-defined.js"
import { spy } from "sinon"

import "../leu-menu-item.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-menu-item
      href=${ifDefined(args.href)}
      ?active=${args.active}
      ?disabled=${args.disabled}
    >
      ${args.label}
    </leu-menu-item>
  `)
}

describe("LeuMenuItem", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-menu-item")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({ label: "Download" })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with a link", async () => {
    const el = await defaultFixture({
      label: "Download",
      href: "https://zh.ch",
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders a label", async () => {
    const el = await defaultFixture({ label: "Download" })

    expect(el).to.have.trimmed.text("Download")
  })

  it("renders a button", async () => {
    const el = await defaultFixture({ label: "Download" })

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.exist
  })

  it("renders a link", async () => {
    const el = await defaultFixture({
      label: "Kanton Zürich",
      href: "https://zh.ch",
    })

    const link = el.shadowRoot.querySelector("a")

    expect(link).to.exist
    expect(link).to.have.attribute("href", "https://zh.ch")
    expect(el).to.have.trimmed.text("Kanton Zürich")
  })

  it("passes the disabled attribute to the button", async () => {
    const el = await defaultFixture({ label: "Download", disabled: true })

    const button = el.shadowRoot.querySelector("button")
    expect(button).to.have.attribute("disabled")
  })

  it("lets the click event bubble up", async () => {
    const el = await defaultFixture({ label: "Download" })

    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => {
      button.click()
    })

    const event = await oneEvent(el, "click")

    expect(event).to.exist
  })

  it("does not let the click event bubble up when disabled", async () => {
    const el = await defaultFixture({ label: "Download", disabled: true })

    const button = el.shadowRoot.querySelector("button")
    const clickSpy = spy()
    button.addEventListener("click", clickSpy)

    el.click()

    expect(clickSpy).to.have.not.been.called
  })
})
