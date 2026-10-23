import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("is not valid when required and no file is selected", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-file-input label="File upload" required></leu-file-input>
      </form>
    `)
    const fileInput = form.querySelector<LeuFileInput>("leu-file-input")

    expect(fileInput.validity.valid).toBe(false)
    expect(fileInput.validity.valueMissing).toBe(true)
    expect(form.checkValidity()).toBe(false)
  })

  it("dispatches change after validity is updated", async () => {
    const el = await fixture<LeuFileInput>(html`
      <leu-file-input
        label="File upload"
        required
        accept="text/plain"
      ></leu-file-input>
    `)
    const dropzone = el.shadowRoot?.querySelector<HTMLDivElement>(".dropzone")
    const dataTransfer = new DataTransfer()
    const file = new File(["content"], "test.txt", { type: "text/plain" })
    dataTransfer.items.add(file)
    let validityAtChangeEvent: boolean | undefined

    el.addEventListener("change", () => {
      validityAtChangeEvent = el.checkValidity()
    })

    dropzone?.dispatchEvent(new DragEvent("drop", { dataTransfer }))
    await el.updateComplete

    expect(validityAtChangeEvent).toBe(true)
  })
})
