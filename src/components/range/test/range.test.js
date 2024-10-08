import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-range.js"

async function defaultFixture(args = {}) {
  return fixture(html`
    <leu-range
      label=${args.label}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      value=${ifDefined(args.value)}
      step=${ifDefined(args.step)}
      name=${ifDefined(args.name)}
    >
    </leu-range>
  `)
}

describe("LeuRange", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-range")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit with a single thumb", async () => {
    const el = await defaultFixture({ label: "Wert auswählen" })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with multiple thumbs", async () => {
    const el = await defaultFixture({
      multiple: true,
      value: "1965, 2022",
      min: 1965,
      max: 2022,
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("converts the value attribute to an array of numbers", async () => {
    const el = await defaultFixture({ value: "15" })

    expect(el.defaultValue).to.deep.equal([15])

    el.setAttribute("value", "42, 54")
    await elementUpdated(el)
    expect(el.defaultValue).to.deep.equal([42, 54])

    el.setAttribute("value", "54, 42")
    await elementUpdated(el)
    expect(el.defaultValue).to.deep.equal([54, 42])

    el.setAttribute("value", "  11,    91   ")
    await elementUpdated(el)
    expect(el.defaultValue).to.deep.equal([11, 91])
  })

  it("resolves the value property to the actual value of the underlying input element", async () => {
    const el = await defaultFixture({ value: "15" })

    const input = el.shadowRoot.querySelector(".range--base")

    expect(el.value).to.equal("15")
    expect(input.value).to.equal("15")

    // This is operation is not allowed and is just used for testing purposes
    input.value = "42"
    expect(el.value).to.equal("42")
  })

  it("resolves the value property to the actual values of the underlying input elements (multiple)", async () => {
    const el = await defaultFixture({
      multiple: true,
      value: "1965, 2022",
      min: 1965,
      max: 2022,
    })

    const inputs = el.shadowRoot.querySelectorAll("input")

    expect(el.value).to.equal("1965,2022")
    expect(inputs[0].value).to.equal("1965")
    expect(inputs[1].value).to.equal("2022")

    // This is operation is not allowed and is just used for testing purposes
    inputs[0].value = "1970"
    inputs[1].value = "2020"
    expect(el.value).to.equal("1970,2020")
  })

  it("returns the value of the input elements as an array of numbers", async () => {
    const el = await defaultFixture({
      multiple: true,
      value: "1965, 2022",
      min: 1960,
      max: 2025,
    })

    expect(el.valueAsArray).to.deep.equal([1965, 2022])

    el.value = [1970, 2020]
    await elementUpdated(el)
    expect(el.valueAsArray).to.deep.equal([1970, 2020])

    el.multiple = false
    el.value = "1976"
    await elementUpdated(el)
    expect(el.valueAsArray).to.deep.equal([1976])
  })

  it("writes each value of the inputs to an output element", async () => {
    const el = await defaultFixture({
      multiple: true,
      value: "16, 168",
      min: 0,
      max: 321,
    })

    const inputs = Array.from(el.shadowRoot.querySelectorAll("input"))
    let outputs = inputs.map((input) =>
      el.shadowRoot.querySelector(`output[for="${input.id}"]`)
    )

    expect(outputs[0]).to.exist
    expect(outputs[0].value).to.equal("16")
    expect(outputs[1]).to.exist
    expect(outputs[1].value).to.equal("168")

    el.value = [54, 42]
    await elementUpdated(el)
    expect(outputs[0].value).to.equal("54")
    expect(outputs[1].value).to.equal("42")

    el.multiple = false
    el.value = "123"
    await elementUpdated(el)

    outputs = el.shadowRoot.querySelectorAll("output")
    expect(outputs[0].value).to.equal("123")
    expect(outputs.length).to.equal(1)
  })

  it("calculates a normalized value", async () => {
    const el = await defaultFixture({
      value: "50",
      min: 0,
      max: 100,
    })

    expect(el._getNormalizedValue(50)).to.equal(0.5)
    expect(el._getNormalizedValue(80)).to.equal(0.8)

    el.min = 0
    el.max = 200
    expect(el._getNormalizedValue(50)).to.equal(0.25)
    expect(el._getNormalizedValue(80)).to.equal(0.4)

    el.min = 0
    el.max = 70
    expect(el._getNormalizedValue(42)).to.equal(0.6)
    expect(el._getNormalizedValue(17.5)).to.equal(0.25)
  })

  it("calculates a normalized range", async () => {
    const el = await defaultFixture({
      value: "40",
      min: 0,
      max: 800,
    })

    expect(el._getNormalizedRange()).to.deep.equal([0, 0.05])

    el.multiple = true
    await elementUpdated(el)
    el.value = ["20", "80"]

    expect(el._getNormalizedRange()).to.deep.equal([0.025, 0.1])

    el.value = ["480", "720"]
    await elementUpdated(el)
    expect(el._getNormalizedRange()).to.deep.equal([0.6, 0.9])
  })

  it("renders a label element for a single thumb", async () => {
    const el = await defaultFixture({ label: "Wert auswählen" })

    const label = el.shadowRoot.querySelector(".label")

    expect(label).to.contain.text("Wert auswählen")
    expect(label).to.be.instanceOf(HTMLLabelElement)

    const input = el.shadowRoot.querySelector("input")
    expect(input).to.not.have.attribute("aria-label", "Wert auswählen")
  })

  it("renders a label alternative for multiple thumbs", async () => {
    const el = await defaultFixture({
      label: "Wert auswählen",
      multiple: true,
      value: "1965, 2022",
      min: 1965,
      max: 2022,
    })

    const label = el.shadowRoot.querySelector(".label")

    expect(label).to.exist
    expect(label).to.contain.text("Wert auswählen")
    expect(label).to.not.be.instanceOf(HTMLLabelElement)

    const inputs = el.shadowRoot.querySelectorAll("input")
    expect(inputs[0]).to.have.attribute("aria-label", "Von")
    expect(inputs[1]).to.have.attribute("aria-label", "Bis")
  })

  it("is usable with the keyboard", async () => {
    const el = await defaultFixture({
      value: "50",
      min: 0,
      max: 100,
    })

    await sendKeys({
      press: "Tab",
    })

    await sendKeys({ press: "ArrowRight" })
    await sendKeys({ press: "ArrowRight" })

    expect(el.value).to.equal("52")

    el.step = 5
    await elementUpdated(el)

    await sendKeys({ press: "ArrowLeft" })
    await sendKeys({ press: "ArrowLeft" })
    expect(el.value).to.equal("40")

    await sendKeys({ press: "PageUp" })
    expect(el.value).to.equal("50")

    await sendKeys({ press: "PageDown" })
    expect(el.value).to.equal("40")

    await sendKeys({ press: "Home" })
    expect(el.value).to.equal("0")

    await sendKeys({ press: "ArrowLeft" })
    await sendKeys({ press: "ArrowLeft" })
    expect(el.value).to.equal("0")

    await sendKeys({ press: "End" })
    expect(el.value).to.equal("100")

    await sendKeys({ press: "ArrowRight" })
    await sendKeys({ press: "ArrowRight" })
    expect(el.value).to.equal("100")
  })

  it("sets the native input attribute on the input element", async () => {
    const el = await defaultFixture({
      disabled: true,
      min: 1,
      max: 123,
      step: 13,
      name: "field-name",
    })

    const input = el.shadowRoot.querySelector("input")

    expect(input).to.have.attribute("disabled")
    expect(input).to.have.attribute("min", "1")
    expect(input).to.have.attribute("max", "123")
    expect(input).to.have.attribute("step", "13")
    expect(input).to.have.attribute("name", "field-name")
  })

  it("sets the native input attribute on the input elements (multiple)", async () => {
    const el = await defaultFixture({
      disabled: true,
      min: 1,
      max: 123,
      step: 13,
      name: "field-name",
      multiple: true,
    })

    const inputs = el.shadowRoot.querySelectorAll("input")

    expect(inputs[0]).to.have.attribute("disabled")
    expect(inputs[0]).to.have.attribute("min", "1")
    expect(inputs[0]).to.have.attribute("max", "123")
    expect(inputs[0]).to.have.attribute("step", "13")
    expect(inputs[0]).to.have.attribute("name", "field-name")

    expect(inputs[1]).to.have.attribute("disabled")
    expect(inputs[1]).to.have.attribute("min", "1")
    expect(inputs[1]).to.have.attribute("max", "123")
    expect(inputs[1]).to.have.attribute("step", "13")
    expect(inputs[1]).to.have.attribute("name", "field-name")
  })
})
