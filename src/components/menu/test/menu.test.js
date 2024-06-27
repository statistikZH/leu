import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-menu.js"
import "../leu-menu-item.js"
import "../../icon/leu-icon.js"

async function defaultFixture(args = {}) {
  return fixture(html` <leu-menu
    role=${ifDefined(args.role)}
    selects=${ifDefined(args.selects)}
  >
    <leu-menu-item
      ><leu-icon slot="before"></leu-icon>Menu Item 1</leu-menu-item
    >
    <leu-menu-item active
      ><leu-icon slot="before" name="check"></leu-icon>Menu Item
      2</leu-menu-item
    >
    <leu-menu-item
      ><leu-icon slot="before"></leu-icon>Menu Item 3</leu-menu-item
    >
    <hr />
    <leu-menu-item
      ><leu-icon name="pin" slot="before"></leu-icon>Menu Item 3<slot
        name="after"
        >CH</slot
      ></leu-menu-item
    >
    <leu-menu-item>Menu Item 4</leu-menu-item>
  </leu-menu>`)
}

describe("LeuMenu", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-menu")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).dom.to.be.accessible()
  })

  it("sets 'menu' as the default role", async () => {
    const el = await defaultFixture()

    expect(el.getAttribute("role")).to.equal("menu")
  })

  it("sets 'menuitem' as the default role for menu items", async () => {
    const el = await defaultFixture()

    const menuItems = el.querySelectorAll("leu-menu-item")

    menuItems.forEach((menuItem) => {
      expect(menuItem.componentRole).to.equal("menuitem")
    })
  })

  it("sets 'menuitemradio' as the role for menu items when only one item can be selected", async () => {
    const el = await defaultFixture({ selects: "single" })

    const menuItems = el.querySelectorAll("leu-menu-item")

    menuItems.forEach((menuItem) => {
      expect(menuItem.componentRole).to.equal("menuitemradio")
    })
  })

  it("sets 'menuitemcheckbox' as the role for menu items when multiple items can be selected", async () => {
    const el = await defaultFixture({ selects: "multiple" })

    const menuItems = el.querySelectorAll("leu-menu-item")

    menuItems.forEach((menuItem) => {
      expect(menuItem.componentRole).to.equal("menuitemcheckbox")
    })
  })

  it("sets 'option' as the role for menu items when the menu role is 'listbox'", async () => {
    const el = await defaultFixture({ role: "listbox" })

    const menuItems = el.querySelectorAll("leu-menu-item")

    menuItems.forEach((menuItem) => {
      expect(menuItem.componentRole).to.equal("option")
    })
  })

  it("moves the focus when the arrow keys are pressed", async () => {
    const el = await defaultFixture()

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))

    await sendKeys({ press: "Tab" })
    expect(document.activeElement).to.equal(menuItems[0])

    await sendKeys({ press: "ArrowDown" })
    await sendKeys({ press: "ArrowDown" })

    expect(document.activeElement).to.equal(menuItems[2])

    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })

    expect(document.activeElement).to.equal(menuItems.at(-1))

    await sendKeys({ press: "Home" })
    expect(document.activeElement).to.equal(menuItems[0])

    await sendKeys({ press: "End" })
    expect(document.activeElement).to.equal(menuItems.at(-1))

    await sendKeys({ press: "ArrowDown" })
    expect(document.activeElement).to.equal(menuItems[0])
  })
})
