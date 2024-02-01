import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import { spy } from "sinon"

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
    const el = customElements.get("leu-input")

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

  it("fires a change event after losing focus", async () => {
    const el = await defaultFixture({ label: "Vorname" })

    const input = el.shadowRoot.querySelector("input")

    const changeSpy = spy()
    input.addEventListener("change", changeSpy)

    el.focus()

    await sendKeys({ type: "John" })
    await sendKeys({ press: "Tab" })

    expect(changeSpy).to.have.been.calledOnce
  })

  it("fires a input event while typing ", async () => {
    const el = await defaultFixture({ label: "Vorname", maxlength: 3 })

    const input = el.shadowRoot.querySelector("input")

    const inputSpy = spy()
    input.addEventListener("input", inputSpy)

    el.focus()

    await sendKeys({ type: "John" })

    // Should fire 3 times, because maxlength is set to 3
    expect(inputSpy).to.have.been.called.calledThrice
  })

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

    let clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).to.not.exist

    el.focus()
    await sendKeys({ type: "John" })

    clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).to.not.be.null
  })

  it("clears the value when clicking the clear button", async () => {
    const el = await defaultFixture({ label: "Vorname", clearable: true })

    el.focus()

    await sendKeys({ type: "John" })
    await elementUpdated(el)

    const clearButton = el.shadowRoot.querySelector(".clear-button")
    clearButton.click()

    expect(el.value).to.equal("")
  })

  it("renders an error message when value is less than min", async () => {
    const el = await defaultFixture({ label: "Länge", min: 10, type: "number" })

    el.focus()

    await sendKeys({ type: "5" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders an error message when value greater than max", async () => {
    const el = await defaultFixture({ label: "Länge", max: 10, type: "number" })

    el.focus()

    await sendKeys({ type: "15" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders an error message when the value doesn't match the step", async () => {
    const el = await defaultFixture({
      label: "Länge",
      step: 10,
      type: "number",
    })

    el.focus()

    await sendKeys({ type: "15" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders an error message when value is shorter than minlength", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      minlength: 3,
    })

    el.focus()

    await sendKeys({ type: "Jo" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders an error message when value is longer than maxlength", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      maxlength: 10,
      value: "Andrea Gabathuler",
    })

    el.focus()

    /* Remove the selection, if there is one */
    await sendKeys({ press: "ArrowRight" })
    /*
     * Trigger an update of the value that is too long.
     * Browser won't allow to type more than maxlength.
     */
    await sendKeys({ press: "Backspace" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders an error message when value doesn't match pattern", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      pattern: "([A-Z]{2}-)?d{4,5}", // Pseudo zip code e.g. CH-8000 or 8000 or DE-12345
    })

    el.focus()

    await sendKeys({ type: "123" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    let error = el.shadowRoot.querySelector(".error")
    expect(error).not.to.be.null

    el.value = ""
    await elementUpdated(el)

    el.focus()

    await sendKeys({ type: "DE-987" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    error = el.shadowRoot.querySelector(".error")
    expect(error).not.to.be.null
  })

  it("renders an error message when value is required but is empty", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
    })

    el.focus()

    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.to.be.null
  })

  it("renders a custom error message", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      error: "Bitte geben Sie einen Vornamen ein.",
    })

    el.focus()

    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).to.have.trimmed.text("Bitte geben Sie einen Vornamen ein.")
  })

  it("resets the error message as soon as value is valid again", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
    })

    el.focus()

    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    let error = el.shadowRoot.querySelector(".error")
    expect(error).not.to.be.null

    el.focus()

    await sendKeys({ type: "Jacqueline" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    error = el.shadowRoot.querySelector(".error")
    expect(error).to.be.null
  })

  it("doesn't render an error message when novalidate is set", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
      novalidate: true,
    })

    el.focus()

    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    const error = el.shadowRoot.querySelector(".error")

    expect(error).to.be.null
  })

  it("shows only one 'after' element", async () => {
    const el = await defaultFixture({
      label: "Länge",
      type: "number",
      min: 50,
      icon: "user",
      clearable: true,
    })

    const getErrorIcon = () => el.shadowRoot.querySelector(".error-icon")
    const getClearButton = () => el.shadowRoot.querySelector(".clear-button")
    const getIcon = () => el.shadowRoot.querySelector(".icon")

    /* Priority: Error > Clear > Icon */
    expect(getErrorIcon()).to.be.null
    expect(getClearButton()).to.be.null
    expect(getIcon()).not.to.be.null

    el.focus()
    await sendKeys({ type: "60" })

    expect(getErrorIcon()).to.be.null
    expect(getClearButton()).not.to.be.null
    expect(getIcon()).to.be.null

    el.value = ""
    await elementUpdated(el)

    el.focus()
    await sendKeys({ type: "40" })
    await sendKeys({ press: "Tab" })
    await elementUpdated(el)

    expect(getErrorIcon()).not.to.be.null
    expect(getClearButton()).to.be.null
    expect(getIcon()).to.be.null
  })
})
