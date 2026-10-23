import { html } from "lit"
import { axe, fixture, oneEvent } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

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
      ?multipleSelection=${args.multipleSelection}
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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await wrappedFixture({ label: "Download" })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit with a link", async () => {
    const el = await wrappedFixture({
      label: "Download",
      href: "https://zh.ch",
      menuRole: "none",
    })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders a label", async () => {
    const el = await defaultFixture({ label: "Download" })

    expect(el.textContent.trim()).toBe("Download")
  })

  it("renders a button", async () => {
    const el = await defaultFixture({ label: "Download" })

    const button = el.shadowRoot.querySelector("button")

    expect(button).toBeTruthy()
  })

  it("renders a link", async () => {
    const el = await defaultFixture({
      label: "Kanton Zürich",
      href: "https://zh.ch",
    })

    const link = el.shadowRoot.querySelector("a")

    expect(link).toBeTruthy()
    expect(link).toHaveAttribute("href", "https://zh.ch")
    expect(el.textContent.trim()).toBe("Kanton Zürich")
  })

  it("sets the aria-disabled attribute to the button", async () => {
    const el = await defaultFixture({ label: "Download", disabled: true })

    const button = el.shadowRoot.querySelector("button")
    expect(button).toHaveAttribute("aria-disabled", "true")
  })

  it("sets the defined role on the button", async () => {
    const el = await defaultFixture({
      label: "Download",
    })

    const button = el.shadowRoot.querySelector("button")
    expect(button).toHaveAttribute("role", "menuitem")

    el.componentRole = "menuitemcheckbox"
    await el.updateComplete
    expect(button).toHaveAttribute("role", "menuitemcheckbox")

    el.componentRole = "menuitemradio"
    await el.updateComplete
    expect(button).toHaveAttribute("role", "menuitemradio")

    el.componentRole = "option"
    await el.updateComplete
    expect(button).toHaveAttribute("role", "option")

    el.componentRole = "none"
    await el.updateComplete
    expect(button).not.toHaveAttribute("role")
  })

  it("adds either the aria-checked or aria-selected attribute to the button when the item is active", async () => {
    const el = await defaultFixture({
      label: "Download",
      componentRole: "option",
      active: true,
    })

    const button = el.shadowRoot.querySelector("button")
    expect(button).toHaveAttribute("aria-selected", "true")
    expect(button).not.toHaveAttribute("aria-checked")

    el.componentRole = "menuitemcheckbox"
    await el.updateComplete
    expect(button).toHaveAttribute("aria-checked", "true")
    expect(button).not.toHaveAttribute("aria-selected")

    el.componentRole = "menuitemradio"
    await el.updateComplete
    expect(button).toHaveAttribute("aria-checked", "true")
    expect(button).not.toHaveAttribute("aria-selected")
  })

  it("lets the click event bubble up", async () => {
    const el = await defaultFixture({ label: "Download" })

    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => {
      button.click()
    })

    const event = await oneEvent(el, "click")

    expect(event).toBeTruthy()
  })

  it("does not let the click event bubble up when disabled", async () => {
    const el = await defaultFixture({ label: "Download", disabled: true })

    const button = el.shadowRoot.querySelector("button")
    const clickSpy = vi.fn()
    button.addEventListener("click", clickSpy)

    el.click()

    expect(clickSpy).not.toHaveBeenCalled()
  })

  it("reflects the tabbable property as tabindex to the button", async () => {
    const el = await defaultFixture({ label: "Download", tabbable: true })

    const button = el.shadowRoot.querySelector("button")
    expect(button).toHaveAttribute("tabindex", "0")

    el.tabbable = false
    await el.updateComplete
    expect(button).toHaveAttribute("tabindex", "-1")

    el.tabbable = undefined
    await el.updateComplete
    expect(button).not.toHaveAttribute("tabindex")
  })

  it("returns the value or label when getValue is called", async () => {
    const el = await defaultFixture({ label: "Download          " })

    expect(el.getValue()).toBe("Download")

    el.value = "download-01"

    expect(el.getValue()).toBe("download-01")
  })

  it("renders a placeholder icon when the menu item is part of multiple selection but not active", async () => {
    const el = await defaultFixture({
      label: "Download",
      multipleSelection: true,
    })

    const icon = el.shadowRoot.querySelector("leu-icon")
    expect(icon).toBeTruthy()
    expect(icon).toHaveAttribute("name", "")
  })

  it("renders a check icon when the menu item is part of multiple selection and is active", async () => {
    const el = await defaultFixture({
      label: "Download",
      multipleSelection: true,
      active: true,
    })

    const icon = el.shadowRoot.querySelector("leu-icon")
    expect(icon).toBeTruthy()
    expect(icon).toHaveAttribute("name", "check")
  })
})
