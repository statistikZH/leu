import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-progress-bar.js"
import { type LeuProgressBar } from "../ProgressBar.js"

async function defaultFixture({
  value,
  label,
  indeterminate,
}: { value?: number; label?: string; indeterminate?: boolean } = {}) {
  return fixture<LeuProgressBar>(
    html`<leu-progress-bar
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?indeterminate=${indeterminate}
    ></leu-progress-bar>`,
  )
}

describe("LeuProgressBar", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-progress-bar")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({ value: 65, label: "Datei hochladen" })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the text labels and applies the value", async () => {
    const el = await defaultFixture({ value: 65, label: "Datei hochladen" })

    const label = el.shadowRoot?.querySelector(".label")
    const value = el.shadowRoot?.querySelector(".value")
    const progress = el.shadowRoot?.querySelector("progress")

    expect(label?.textContent).toBe("Datei hochladen")
    expect(value?.textContent).toBe("65 %")
    expect(progress?.value).toBe(65)
  })

  it("applies the indeterminate state", async () => {
    const el = await defaultFixture({
      value: 65,
      label: "Datei hochladen",
      indeterminate: true,
    })

    const value = el.shadowRoot?.querySelector(".value")
    const progress = el.shadowRoot?.querySelector("progress")

    expect(value).toBeFalsy()
    expect(progress).not.toHaveAttribute("value")
    expect(progress).not.toHaveAttribute("max")
  })
})
