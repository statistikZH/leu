import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-accordion.js"

async function defaultFixture() {
  return fixture(html`
    <leu-accordion label="Titel des Akkordeons"></leu-accordion>
  `)
}

describe("LeuAccordion", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-accordion")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the correct heading tag", async () => {
    const el = await defaultFixture()

    expect(el._getHeadingTag()).toBe("h2")

    el.headingLevel = 1
    expect(el._getHeadingTag()).toBe("h1")

    el.headingLevel = 2
    expect(el._getHeadingTag()).toBe("h2")

    el.headingLevel = 3
    expect(el._getHeadingTag()).toBe("h3")

    el.headingLevel = 4
    expect(el._getHeadingTag()).toBe("h4")

    el.headingLevel = 5
    expect(el._getHeadingTag()).toBe("h5")

    el.headingLevel = 6
    expect(el._getHeadingTag()).toBe("h6")
  })

  it("doesn't render an invalid heading tag", async () => {
    const el = await defaultFixture()

    el.headingLevel = 10
    expect(el._getHeadingTag()).toBe("h2")

    el.headingLevel = -1
    expect(el._getHeadingTag()).toBe("h2")

    el.headingLevel = 0
    expect(el._getHeadingTag()).toBe("h2")

    el.headingLevel = "h3"
    expect(el._getHeadingTag()).toBe("h2")
  })

  it("toggles the open state", async () => {
    const el = await fixture(
      html`<leu-accordion label="Titel des Akkordeons"
        ><div slot="content">Das ist der Inhalt</div></leu-accordion
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(el.open).toBe(false)

    button.click()
    expect(el.open).toBe(true)

    button.click()
    expect(el.open).toBe(false)
  })

  // TODO: `.visible` throws an error:
  // DOMException: HTMLDivElement object could not be cloned.
  // Maybe chai-dom is not compatible with using slots?
  // it("doesn't show the content when it is closed", async () => {
  //   const el = await fixture(
  //     html`<leu-accordion label="Titel des Akkordeons"
  //       ><div slot="content">Das ist der Inhalt</div></leu-accordion
  //     >`,
  //   )

  //   const button = el.shadowRoot.querySelector("button")
  //   const content = el.querySelector("[slot=content]")

  //   expect(el).toHaveAttribute("label", "Titel des Akkordeons")
  //   expect(content).not.toBeVisible()

  //   button.click()
  //   await el.updateComplete
  //   await new Promise((resolve) => setTimeout(resolve, 150))
  //   expect(content).toBeVisible()
  // })

  it("shows the label prefix before the label", async () => {
    const el = await fixture(
      html`<leu-accordion
        label-prefix="01"
        label="Titel des Akkordeons"
      ></leu-accordion>`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toMatchTextContent("01")
    expect(button).toMatchTextContent("Titel des Akkordeons")
  })
})
