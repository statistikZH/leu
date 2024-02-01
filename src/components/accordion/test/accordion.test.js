import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-accordion.js"

async function defaultFixture() {
  return fixture(
    html` <leu-accordion label="Titel des Akkordeons"></leu-accordion> `
  )
}

describe("LeuAccordion", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-accordion")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the correct heading tag", async () => {
    const el = await defaultFixture()

    await expect(el._getHeadingTag()).to.equal("h2")

    el.headingLevel = 1
    await expect(el._getHeadingTag()).to.equal("h1")

    el.headingLevel = 2
    await expect(el._getHeadingTag()).to.equal("h2")

    el.headingLevel = 3
    await expect(el._getHeadingTag()).to.equal("h3")

    el.headingLevel = 4
    await expect(el._getHeadingTag()).to.equal("h4")

    el.headingLevel = 5
    await expect(el._getHeadingTag()).to.equal("h5")

    el.headingLevel = 6
    await expect(el._getHeadingTag()).to.equal("h6")
  })

  it("doesn't render an invalid heading tag", async () => {
    const el = await defaultFixture()

    el.headingLevel = 10
    expect(el._getHeadingTag()).to.equal("h2")

    el.headingLevel = -1
    expect(el._getHeadingTag()).to.equal("h2")

    el.headingLevel = 0
    expect(el._getHeadingTag()).to.equal("h2")

    el.headingLevel = "h3"
    expect(el._getHeadingTag()).to.equal("h2")
  })

  it("toggles the open state", async () => {
    const el = await fixture(
      html`<leu-accordion label="Titel des Akkordeons"
        ><div slot="content">Das ist der Inhalt</div></leu-accordion
      >`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(el.open).to.be.false

    button.click()
    expect(el.open).to.be.true

    button.click()
    expect(el.open).to.be.false
  })

  it("doesn't show the content when it is closed", async () => {
    const el = await fixture(
      html`<leu-accordion label="Titel des Akkordeons"
        ><div slot="content">Das ist der Inhalt</div></leu-accordion
      >`
    )

    const button = el.shadowRoot.querySelector("button")
    const content = el.shadowRoot.querySelector(".content")

    expect(content).not.to.be.visible

    button.click()
    expect(content).to.be.visible
  })

  it("shows the label prefix before the label", async () => {
    const el = await fixture(
      html`<leu-accordion
        label-prefix="01"
        label="Titel des Akkordeons"
      ></leu-accordion>`
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.contain.text("01")
    expect(button).to.contain.text("Titel des Akkordeons")
  })
})
