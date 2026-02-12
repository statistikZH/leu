import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range.js"
import type { LeuRange } from "../leu-range.js"

async function defaultFixture(args = {}) {
  return fixture<LeuRange>(html`
    <leu-range
      label=${args.label}
      ?disabled=${args.disabled}
      ?multiple=${args.multiple}
      min=${ifDefined(args.min)}
      max=${ifDefined(args.max)}
      value=${ifDefined(args.value)}
      step=${ifDefined(args.step)}
      prefix=${ifDefined(args.prefix)}
      suffix=${ifDefined(args.suffix)}
      .valueFormatter=${args.valueFormatter}
      ?hide-label=${args["hide-label"]}
      ?show-ticks=${args["show-ticks"]}
      ?show-range-labels=${args["show-range-labels"]}
    >
    </leu-range>
  `)
}

describe("LeuRange", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-range")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      label: "Test Label",
      min: 0,
      max: 100,
      value: 50,
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await defaultFixture({ label: "Test Label" })

    const label = el.shadowRoot?.querySelector(".label")

    expect(label).to.exist
    expect(label).to.contain.text("Test Label")
  })

  it("renders the label visually hidden when 'hide-label' is set", async () => {
    const el = await defaultFixture({ label: "Test Label", "hide-label": true })

    const label = el.shadowRoot?.querySelector(".label")

    expect(label).to.exist
    expect(label).to.contain.text("Test Label")
    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the range labels", async () => {
    const el = await defaultFixture({
      min: 23,
      max: 87,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".tick-label--max")

    expect(minLabel).to.exist
    expect(maxLabel).to.exist

    expect(minLabel).to.contain.text("23")
    expect(maxLabel).to.contain.text("87")
  })

  it("renders tick marks when 'show-ticks' is set", async () => {
    const el = await defaultFixture({
      min: 0,
      max: 10,
      step: 3,
      "show-ticks": true,
    })

    const ticksContainer = el.shadowRoot?.querySelector(".ticks")
    expect(ticksContainer).to.exist

    const ticks = ticksContainer?.querySelectorAll(".tick")
    expect(ticks?.length).to.equal(4)
  })

  it("renders prefix and suffix", async () => {
    const el = await defaultFixture({
      prefix: "$",
      suffix: " CHF",
      min: 25,
      max: 75,
      value: 50,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).to.exist
    expect(maxLabel).to.exist
    expect(valueLabel).to.exist

    expect(minLabel).to.contain.text("$25 CHF")
    expect(maxLabel).to.contain.text("$75 CHF")
    expect(valueLabel).to.contain.text("$50 CHF")
  })

  it("uses custom valueFormatter if provided", async () => {
    const el = await defaultFixture({
      valueFormatter: (value: number) => `Value: ${value}`,
      min: 10,
      max: 90,
      value: 50,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).to.exist
    expect(maxLabel).to.exist
    expect(valueLabel).to.exist

    expect(minLabel).to.contain.text("Value: 10")
    expect(maxLabel).to.contain.text("Value: 90")
    expect(valueLabel).to.contain.text("Value: 50")
  })

  it("prefix and suffix are ignored when valueFormatter is provided", async () => {
    const el = await defaultFixture({
      prefix: "$",
      suffix: " CHF",
      valueFormatter: (value: number) => `${value}/${value + 1}`,
      min: 10,
      max: 15,
      value: 12,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).to.contain.text("10/11")
    expect(maxLabel).to.contain.text("15/16")
    expect(valueLabel).to.contain.text("12/13")
  })

  it("disables the range slider", async () => {
    const el = await defaultFixture({ disabled: true })

    const input = el.shadowRoot?.querySelector("input")
    expect(input).to.have.attribute("disabled")
  })

  it("clamps and rounds when value is set", async () => {
    const el = await defaultFixture({ min: 0, max: 10, step: 3 })

    el.value = "8"
    await el.updateComplete

    expect(el.value).to.equal("9")
  })

  it("re-normalizes when min/max/step changes", async () => {
    const el = await defaultFixture({ min: 0, max: 10, step: 2 })

    el.value = "9"
    await el.updateComplete

    expect(el.value).to.equal("10")

    el.max = 6
    await el.updateComplete

    expect(el.value).to.equal("6")
  })

  it("sets the second handle to min when multiple and a single value is provided", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 10,
      max: 100,
      value: 20,
    })

    expect(el.value).to.equal("10,20")

    el.value = "30"
    await el.updateComplete
    expect(el.value).to.equal("10,30")

    el.value = "30, 40"
    await el.updateComplete
    expect(el.value).to.equal("30,40")
  })

  it("re-normalizes both values when multiple and min/max/step changes", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 0,
      max: 10,
      step: 2,
      value: "3,7",
    })

    expect(el.value).to.equal("4,8")

    el.max = 6
    await el.updateComplete

    expect(el.value).to.equal("4,6")
  })
})
