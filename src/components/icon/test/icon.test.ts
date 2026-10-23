import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-icon.js"
import { IconPathName } from "../paths.js"

async function defaultFixture(name: IconPathName | "" = "close") {
  return fixture(html` <leu-icon name=${name}></leu-icon> `)
}

describe("LeuIcon", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-icon")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders a 24x24 icon by default", async () => {
    const el = await defaultFixture()

    const svg = el.shadowRoot.querySelector("svg")

    expect(svg).toHaveAttribute("width", "24")
    expect(svg).toHaveAttribute("height", "24")
  })

  it("renders the correct icon path", async () => {
    const el = await defaultFixture("angleDropUp")

    const path = el.shadowRoot.querySelector("path")
    expect(path).toHaveAttribute("d", "M7 14.5L12 9.5L17 14.5H7Z")
  })

  it("renders a placeholder if the icon is not found", async () => {
    const el = await defaultFixture("notExisting")

    const placeholder = el.shadowRoot.querySelector(".placeholder")

    expect(placeholder).toBeTruthy()

    const svg = el.shadowRoot.querySelector("svg")
    expect(svg).toBeFalsy()
  })
})
