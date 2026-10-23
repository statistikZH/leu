import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-chip-link.js"

async function defaultFixture() {
  return fixture(html`
    <leu-chip-link href="https://zh.ch/daten">Daten</leu-chip-link>
  `)
}

describe("LeuChipLink", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-chip-link")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the label", async () => {
    const el = await defaultFixture()

    expect(el.textContent.trim()).toBe("Daten")
  })

  it("renders a link element", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("a")).toBeTruthy()
  })

  it("passes the href attribute to the link", async () => {
    const el = await defaultFixture()

    expect(el.shadowRoot.querySelector("a").getAttribute("href")).toBe(
      "https://zh.ch/daten",
    )
  })

  it("delegates the focus to the a element", async () => {
    const el = await defaultFixture()

    el.focus()

    expect(el.shadowRoot.querySelector("a")).toBe(el.shadowRoot.activeElement)
  })
})
