import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-dialog.js"

async function defaultFixture() {
  return fixture(
    html`<leu-dialog label="Title" sublabel="Category">
      This is the content of the dialog.
    </leu-dialog>`,
  )
}

describe("LeuDialog", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-dialog")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit when the modal is open", async () => {
    const el = await defaultFixture()

    el.show()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("opens the dialog when calling show()", async () => {
    const el = await defaultFixture()

    el.show()

    const dialog = el.shadowRoot.querySelector("dialog")

    expect(dialog.open).toBe(true)
  })

  it("closes the dialog when calling close()", async () => {
    const el = await defaultFixture()

    el.show()
    el.close()

    const dialog = el.shadowRoot.querySelector("dialog")

    expect(dialog.open).toBe(false)
  })

  it("renders a label and a sublabel", async () => {
    const el = await defaultFixture()

    const label = el.shadowRoot.querySelector("h1")
    const sublabel = el.shadowRoot.querySelector(".subtitle")

    expect(label.textContent).toBe("Title")
    expect(sublabel.textContent).toBe("Category")
  })

  it("renders a close button", async () => {
    const el = await defaultFixture()

    const closeButton = el.shadowRoot.querySelector(".close-button")

    expect(closeButton).toBeTruthy()
  })

  it("closes the dialog when clicking the close button", async () => {
    const el = await defaultFixture()
    const dialog = el.shadowRoot.querySelector("dialog")

    el.show()

    const closeButton = el.shadowRoot.querySelector(".close-button")
    expect(dialog.open).toBe(true)
    closeButton.click()
    expect(dialog.open).toBe(false)
  })
})
