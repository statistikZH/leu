import { html } from "lit"
import { fixture, expect, oneEvent, elementUpdated } from "@open-wc/testing"
import { ifDefined } from "lit/directives/if-defined.js"
import { spy } from "sinon"

import "../leu-menu.js"
import "../leu-menu-item.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-menu-item
      href=${ifDefined(args.href)}
      componentRole=${ifDefined(args.componentRole)}
      value=${ifDefined(args.value)}
      ?active=${args.active}
      ?disabled=${args.disabled}
      ?tabbable=${args.tabbable}
    >
      ${args.label}
    </leu-menu-item>
  `)
}

async function wrappedFixture(args = {}) {
  return fixture(html`
    <leu-menu role=${ifDefined(args.menuRole)}>
      ${await defaultFixture(args)}
    </leu-menu>
  `)
}

describe("LeuMenuItem", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-menu-item")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await wrappedFixture({ label: "Download" })

    await expect(el).dom.to.be.accessible()
  })

  it("passes the a11y audit with a link", async () => {
    const el = await wrappedFixture({
      label: "Download",
      href: "https://zh.ch",
      menuRole: "none",
    })

    await expect(el).dom.to.be.accessible()
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

  it("sets the aria-disabled attribute to the button", async () => {
    const el = await defaultFixture({ label: "Download", disabled: true })

    const button = el.shadowRoot.querySelector("button")
    expect(button).to.have.attribute("aria-disabled", "true")
  })

  it("sets the defined role on the button", async () => {
    const el = await defaultFixture({
      label: "Download",
    })

    const button = el.shadowRoot.querySelector("button")
    expect(button).to.have.attribute("role", "menuitem")

    el.componentRole = "menuitemcheckbox"
    await elementUpdated(el)
    expect(button).to.have.attribute("role", "menuitemcheckbox")

    el.componentRole = "menuitemradio"
    await elementUpdated(el)
    expect(button).to.have.attribute("role", "menuitemradio")

    el.componentRole = "option"
    await elementUpdated(el)
    expect(button).to.have.attribute("role", "option")

    el.componentRole = "none"
    await elementUpdated(el)
    expect(button).to.not.have.attribute("role")
  })

  it("adds either the aria-checked or aria-selected attribute to the button when the item is active", async () => {
    const el = await defaultFixture({
      label: "Download",
      componentRole: "option",
      active: true,
    })

    const button = el.shadowRoot.querySelector("button")
    expect(button).to.have.attribute("aria-selected", "true")
    expect(button).not.to.have.attribute("aria-checked")

    el.componentRole = "menuitemcheckbox"
    await elementUpdated(el)
    expect(button).to.have.attribute("aria-checked", "true")
    expect(button).not.to.have.attribute("aria-selected")

    el.componentRole = "menuitemradio"
    await elementUpdated(el)
    expect(button).to.have.attribute("aria-checked", "true")
    expect(button).not.to.have.attribute("aria-selected")
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

  it("reflects the tabbable property as tabindex to the button", async () => {
    const el = await defaultFixture({ label: "Download", tabbable: true })

    const button = el.shadowRoot.querySelector("button")
    expect(button).to.have.attribute("tabindex", "0")

    el.tabbable = false
    await elementUpdated(el)
    expect(button).to.have.attribute("tabindex", "-1")

    el.tabbable = undefined
    await elementUpdated(el)
    expect(button).to.not.have.attribute("tabindex")
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture({ label: "Download          " })

    expect(el.getValue()).to.equal("Download")

    el.value = "download-01"

    expect(el.getValue()).to.equal("download-01")
  })
})
