import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import { Icon, iconPaths } from "../icon.js"

async function defaultFixture(args = {}) {
  const { name = "edit", size } = args
  return fixture(html`${Icon(name, size)} `)
}

describe("Icon", () => {
  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders an svg html element", async () => {
    const el = await defaultFixture()

    expect(el).to.have.tagName("svg")
  })

  it("renders a single path", async () => {
    const el = await defaultFixture()

    expect(el.querySelectorAll("path")).to.have.lengthOf(1)
  })

  it("renders the correct path", async () => {
    const el = await defaultFixture({ name: "share" })

    const d = el.querySelector("path").getAttribute("d")

    expect(d).to.equal(iconPaths.share)
  })

  it("has the size 24x24 by default", async () => {
    const el = await defaultFixture()

    const width = el.getAttribute("width")
    const height = el.getAttribute("height")

    expect(width).to.equal("24")
    expect(height).to.equal("24")
  })

  it("has the size 16x16", async () => {
    const el = await defaultFixture({ size: "16" })

    const width = el.getAttribute("width")
    const height = el.getAttribute("height")

    expect(width).to.equal("16")
    expect(height).to.equal("16")
  })

  it("has always a square size", async () => {
    const el = await defaultFixture({ size: "564" })

    const width = el.getAttribute("width")
    const height = el.getAttribute("height")

    expect(width).to.equal(height)
  })
})
