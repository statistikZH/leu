import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

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

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit when the modal is open", async () => {
    const el = await defaultFixture()

    el.show()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("opens the dialog when calling show()", async () => {
    const el = await defaultFixture()

    el.show()

    const dialog = el.shadowRoot.querySelector("dialog")

    expect(dialog.open).to.be.true
  })

  it("closes the dialog when calling close()", async () => {
    const el = await defaultFixture()

    el.show()
    el.close()

    const dialog = el.shadowRoot.querySelector("dialog")

    expect(dialog.open).to.be.false
  })

  it("renders a label and a sublabel", async () => {
    const el = await defaultFixture()

    const label = el.shadowRoot.querySelector("h1")
    const sublabel = el.shadowRoot.querySelector(".subtitle")

    expect(label).to.have.text("Title")
    expect(sublabel).to.have.text("Category")
  })

  it("renders a close button", async () => {
    const el = await defaultFixture()

    const closeButton = el.shadowRoot.querySelector(".close-button")

    expect(closeButton).to.exist
  })

  it("closes the dialog when clicking the close button", async () => {
    const el = await defaultFixture()
    const dialog = el.shadowRoot.querySelector("dialog")

    el.show()

    const closeButton = el.shadowRoot.querySelector(".close-button")
    expect(dialog.open).to.be.true
    closeButton.click()
    expect(dialog.open).to.be.false
  })
})
