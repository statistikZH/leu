import { html } from "lit"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { ifDefined } from "lit/directives/if-defined.js"
import { spy } from "sinon"

import "../leu-menu-item.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-menu-item
      label=${args.label}
      before=${ifDefined(args.before)}
      after=${ifDefined(args.after)}
      href=${ifDefined(args.href)}
      ?active=${args.active}
      ?disabled=${args.disabled}
    ></leu-menu-item>
  `)
}

describe("LeuMenuItem", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-menu-item")

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

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.trimmed.text("Download")
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
    expect(link).to.have.trimmed.text("Kanton Zürich")
  })

  it("renders a before icon", async () => {
    const el = await defaultFixture({ label: "Download", before: "download" })

    const before = el.shadowRoot.querySelector(".before")
    expect(before).to.exist

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='before'></span><span class='label'>Download</span></button>"
    )
  })

  it("renders a before label", async () => {
    const el = await defaultFixture({ label: "Download", before: "DE" })

    const before = el.shadowRoot.querySelector(".before")
    expect(before).to.exist
    expect(before).to.have.trimmed.text("DE")

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='before'>DE</span><span class='label'>Download</span></button>"
    )
  })

  it("renders a before placeholder", async () => {
    const el = await defaultFixture({ label: "Download", before: "EMPTY" })

    const before = el.shadowRoot.querySelector(".before")
    expect(before).to.exist
    expect(before).to.not.have.trimmed.text()

    const iconPlaceholder = before.querySelector(".icon-placeholder")
    expect(iconPlaceholder).to.exist

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='before'><div class='icon-placeholder'></div></span><span class='label'>Download</span></button>"
    )
  })

  it("renders a after icon", async () => {
    const el = await defaultFixture({ label: "Download", after: "download" })

    const after = el.shadowRoot.querySelector(".after")
    expect(after).to.exist

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='label'>Download</span><span class='after'></span></button>"
    )
  })

  it("renders a after label", async () => {
    const el = await defaultFixture({ label: "Download", after: "DE" })

    const after = el.shadowRoot.querySelector(".after")
    expect(after).to.exist
    expect(after).to.have.trimmed.text("DE")

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='label'>Download</span><span class='after'>DE</span></button>"
    )
  })

  it("renders a after placeholder", async () => {
    const el = await defaultFixture({ label: "Download", after: "EMPTY" })

    const after = el.shadowRoot.querySelector(".after")
    expect(after).to.exist
    expect(after).to.not.have.trimmed.text()

    const iconPlaceholder = after.querySelector(".icon-placeholder")
    expect(iconPlaceholder).to.exist

    expect(el).shadowDom.to.equal(
      "<button class='button'><span class='label'>Download</span><span class='after'><div class='icon-placeholder'></div></span></button>"
    )
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
