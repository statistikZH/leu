import { html } from "lit"
import { fixture, expect, aTimeout } from "@open-wc/testing"
import { setViewport } from "@web/test-runner-commands"

import "../leu-breadcrumb.js"

const items = [
  { label: "Kanton Zürich", href: "https://zh.ch" },
  { label: "Gesundheit", href: "https://zh.ch/de/gesundheit.html" },
  {
    label: "Lebensmittel & Gebrauchsgegenstände",
    href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende.html",
  },
  {
    label: "Lebensmittel",
    href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel.html",
  },
  {
    label: "Trinkwasser",
    href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel.html",
  },
]

async function defaultFixture(args = {}) {
  return fixture(
    html` <leu-breadcrumb .items="${args.items ?? items}"></leu-breadcrumb> `
  )
}

describe("LeuBreadcrumb", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-breadcrumb")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()
    await expect(el).to.be.accessible()
  })

  it("renders a list of items", async () => {
    await setViewport({ width: 1024, height: 1024 })
    const el = await defaultFixture()

    const itemEls = el.shadowRoot.querySelectorAll("li")

    expect(itemEls[0]).to.have.trimmed.text(items[0].label)
    expect(itemEls[0].querySelector("a")).to.have.attribute(
      "href",
      items[0].href
    )
    expect(itemEls[1]).to.have.trimmed.text(items[1].label)
    expect(itemEls[1].querySelector("a")).to.have.attribute(
      "href",
      items[1].href
    )
    expect(itemEls[2]).to.have.trimmed.text(items[2].label)
    expect(itemEls[2].querySelector("a")).to.have.attribute(
      "href",
      items[2].href
    )
    expect(itemEls[3]).to.have.trimmed.text(items[3].label)
    expect(itemEls[3].querySelector("a")).to.have.attribute(
      "href",
      items[3].href
    )

    expect(itemEls[4]).to.have.trimmed.text(items[4].label)
    expect(itemEls[4].querySelector("a")).to.not.exist
  })

  it("hides the overflowing items when shrinking the viewport", async () => {
    await setViewport({ width: 1024, height: 1024 })
    const el = await defaultFixture()

    let itemEls = el.shadowRoot.querySelectorAll("li")
    expect(itemEls.length).to.equal(5)

    await setViewport({ width: 768, height: 1024 })
    await aTimeout(600)
    await el.updateComplete
    itemEls = el.shadowRoot.querySelectorAll("li")

    expect(itemEls.length).to.equal(4)
  })

  it("shows all the items when viewport is enlarged", async () => {
    await setViewport({ width: 768, height: 1024 })
    const el = await defaultFixture()

    let itemEls = el.shadowRoot.querySelectorAll("li")
    expect(itemEls.length).to.equal(4)

    await setViewport({ width: 1024, height: 1024 })
    await aTimeout(600)
    await el.updateComplete
    itemEls = el.shadowRoot.querySelectorAll("li")

    expect(itemEls.length).to.equal(5)
  })

  it("only shows the first item when the viewport is too small", async () => {
    await setViewport({ width: 240, height: 1024 })
    const el = await defaultFixture()

    const itemEls = el.shadowRoot.querySelectorAll("li")
    expect(itemEls.length).to.equal(1)

    expect(itemEls[0]).to.have.trimmed.text(items[3].label)
    expect(itemEls[0].querySelector("a")).to.have.attribute(
      "href",
      items[3].href
    )
  })

  it("shows a dropdown toggle when items are hidden", async () => {
    await setViewport({ width: 768, height: 1024 })
    const el = await defaultFixture()

    const dropdownToggle = el.shadowRoot.querySelector("li:nth-child(2) button")
    expect(dropdownToggle).to.exist
    expect(dropdownToggle).to.have.trimmed.text("…")
  })

  it("shows a dropdown when the toggle is clicked", async () => {
    await setViewport({ width: 768, height: 1024 })
    const el = await defaultFixture()

    const dropdownToggle = el.shadowRoot.querySelector("li:nth-child(2) button")
    dropdownToggle.click()

    await el.updateComplete

    const dropdown = el.shadowRoot.querySelectorAll("leu-menu")
    expect(dropdown).to.exist

    const dropdownItems = el.shadowRoot.querySelectorAll("leu-menu-item")
    expect(dropdownItems.length).to.equal(2)
  })
})
