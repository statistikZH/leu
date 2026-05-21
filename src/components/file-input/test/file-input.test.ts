import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-file-input.js"
import { LeuFileInput } from "../FileInput.js"

async function defaultFixture() {
  return fixture<LeuFileInput>(
    html`<leu-file-input label="File upload"></leu-file-input>`,
  )
}

describe("LeuFileInput", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-file-input")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("is not valid when required and no file is selected", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-file-input label="File upload" required></leu-file-input>
      </form>
    `)
    const fileInput = form.querySelector<LeuFileInput>("leu-file-input")

    expect(fileInput.validity.valid).to.be.false
    expect(fileInput.validity.valueMissing).to.be.true
    expect(form.checkValidity()).to.be.false
  })

  it("should successfully add the same file after it has been deleted", async () => {
    const el = await defaultFixture()
    const file = new File(["Testdatei"], "datei.txt")

    const triggerFileSelection = (file: File) => {
      const dt = new DataTransfer()
      dt.items.add(file)
      el.input.files = dt.files

      el.input.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      )
      el.input.dispatchEvent(
        new Event("change", { bubbles: true, composed: true }),
      )
    }

    triggerFileSelection(file)
    await el.updateComplete

    expect(el.files.length).to.equal(1)
    expect(el.files[0].name).to.equal("datei.txt")

    const deleteButton =
      el.shadowRoot!.querySelector<HTMLElement>(".file__button")
    deleteButton.click()
    await el.updateComplete

    expect(el.files.length).to.equal(0)
    expect(el.input.value).to.equal("")

    triggerFileSelection(file)
    await el.updateComplete

    expect(el.files.length).to.equal(1)
    expect(el.files[0].name).to.equal("datei.txt")
  })
})
