import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-menu.js"
import "../leu-menu-item.js"
import "../../icon/leu-icon.js"

async function defaultFixture() {
  return fixture(html` <leu-menu>
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
})
