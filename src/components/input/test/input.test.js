import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-input.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-input
      value=${ifDefined(args.value)}
      error=${ifDefined(args.error)}
      pattern=${ifDefined(args.pattern)}
      prefix=${ifDefined(args.prefix)}
      suffix=${ifDefined(args.suffix)}
      size=${ifDefined(args.size)}
      icon=${ifDefined(args.icon)}
      type=${ifDefined(args.type)}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      minlength=${ifDefined(args.minlength)}
      maxlength=${ifDefined(args.maxlength)}
      label=${args.label || "Label"}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?clearable=${args.clearable}
      ?novalidate=${args.novalidate}
    >
    </leu-input>
  `)
}

describe("LeuInput", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-input")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("delegates the focus to the input element", async () => {
    const el = await defaultFixture()

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    expect(el.shadowRoot.activeElement).to.equal(input)
  })

  it("can't be focused when disabled", async () => {
    const el = await defaultFixture({ disabled: true })

    el.focus()

    expect(el.shadowRoot.activeElement).to.be.null
  })

  it("renders the defined label", async () => {
    const el = await defaultFixture({ label: "Vorname" })

    const label = el.shadowRoot.querySelector("label")

    expect(label).to.have.text("Vorname")
  })

  it("has type text by default", async () => {
    const el = await defaultFixture()

    expect(el.type).to.equal("text")
  })

  it("passes the defined type to the input element", async () => {
    const el = await defaultFixture({ type: "email" })

    const input = el.shadowRoot.querySelector("input")

    expect(input.type).to.equal("email")

    el.type = "password"
    await elementUpdated(el)

    expect(input.type).to.equal("password")
  })

  it("passes the defined value to the input element", async () => {
    const el = await defaultFixture({ label: "Vorname", value: "John" })

    const input = el.shadowRoot.querySelector("input")

    expect(input.value).to.equal("John")

    el.value = "Jane"
    await elementUpdated(el)

    expect(input.value).to.equal("Jane")
  })

  it("syncs the value property of the input and the value property of the component", async () => {
    const el = await defaultFixture({ label: "Vorname", value: "John" })

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    await sendKeys({ press: "Backspace" })
    await sendKeys({ press: "Backspace" })
    await sendKeys({ press: "Backspace" })
    await sendKeys({ press: "Backspace" })
    await sendKeys({ type: "Jane" })
    await elementUpdated(el)

    expect(el.value).to.equal("Jane")
    expect(input.value).to.equal("Jane")
  })

  it("doesn't accept letters when type is set to number", async () => {
    const el = await defaultFixture({ label: "Länge", type: "number" })

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    await sendKeys({ type: "123" })
    await elementUpdated(el)

    expect(el.value).to.equal("123")
    expect(input.value).to.equal("123")

    await sendKeys({ type: "abc" })
    await elementUpdated(el)

    expect(el.value).to.not.equal("123abc")
    expect(input.value).to.not.equal("123abc")
  })

  it("fires a change event after losing focus", async () => {})
  it("fires a input event while typing ", async () => {})

  it("renders a prefix", async () => {
    const el = await defaultFixture({ label: "Preis", prefix: "CHF" })

    const prefix = el.shadowRoot.querySelector(".prefix")

    expect(prefix).to.have.text("CHF")
  })

  it("renders a suffix", async () => {
    const el = await defaultFixture({ label: "Länge", suffix: "cm" })

    const suffix = el.shadowRoot.querySelector(".suffix")

    expect(suffix).to.have.text("cm")
  })

  it("renders an icon", async () => {
    const _el = await defaultFixture({ label: "Vorname", icon: "user" })
  })

  it("renders a clear button", async () => {
    const el = await defaultFixture({ label: "Vorname", clearable: true })

    const clearButton = el.shadowRoot.querySelector(".clear-button")

    expect(clearButton).to.exist
  })

  it("clears the value when clicking the clear button", async () => {
    const el = await defaultFixture({ label: "Vorname", clearable: true })

    const clearButton = el.shadowRoot.querySelector(".clear-button")

    el.focus()

    await sendKeys({ type: "John" })
    await elementUpdated(el)

    expect(el.value).to.equal("John")

    clearButton.click()

    expect(el.value).to.equal("")
  })

  it("renders an error message when value is less than min", async () => {})

  it("renders an error message when value greater than max", async () => {})

  it("renders an error message when the value doesn't match the step", async () => {})

  it("renders an error message when value is shorter than minlength", async () => {})

  it("renders an error message when value is longer than maxlength", async () => {})

  it("renders an error message when value doesn't match pattern", async () => {})

  it("renders an error message when value is required but is empty", async () => {})

  it("renders an error message when value is not in the required syntax", async () => {})

  it("renders an errr message when value doesn't match the pattern", async () => {})

  it("renders a custom error message", async () => {})

  it("resets the error message as soon as value is valid again", async () => {})

  it("doesn't render an error message when novalidate is set", async () => {})

  it("shows only one 'after' element", async () => {})
})
