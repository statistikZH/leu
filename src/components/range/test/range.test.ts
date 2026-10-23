import { html } from "lit"
import { userEvent, commands } from "vitest/browser"
import { axe, fixture } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range.js"
import type { LeuRange } from "../leu-range.js"

function getPointInElement(
  element: Element,
  xFraction: number,
  yFraction = 0.5,
) {
  const { width, height } = element.getBoundingClientRect()
  const safeXFraction = Math.min(Math.max(xFraction, 0), 0.999)

  return {
    x: Math.floor(width * safeXFraction),
    y: Math.floor(height * yFraction),
  }
}

/**
 * Moves the mouse to a point relative to the element. `force` skips
 * playwright's actionability checks, as the thumbs overlap the track.
 */
async function moveMouseTo(
  element: Element,
  position: { x: number; y: number },
) {
  await userEvent.hover(element, { position, force: true })
}

async function moveMouseToElementPoint(
  element: Element,
  xFraction: number,
  yFraction = 0.5,
) {
  await moveMouseTo(element, getPointInElement(element, xFraction, yFraction))
}

const THUMB_RADIUS = 16

function getPointInTrack(element: Element, xFraction: number) {
  const { width, height } = element.getBoundingClientRect()
  const safeXFraction = Math.min(Math.max(xFraction, 0), 0.999)
  const yFraction = 0.5

  const trackWidth = width - THUMB_RADIUS * 2

  const x = Math.floor(THUMB_RADIUS + trackWidth * safeXFraction)
  const y = Math.floor(height * yFraction)

  return { x, y }
}

async function moveMouseToTrackPoint(element: Element, xFraction: number) {
  await moveMouseTo(element, getPointInTrack(element, xFraction))
}

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
  afterEach(async () => {
    await commands.resetMouse()
  })

  it("is a defined element", async () => {
    const el = customElements.get("leu-range")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      label: "Test Label",
      min: 0,
      max: 100,
      value: 50,
    })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the label", async () => {
    const el = await defaultFixture({ label: "Test Label" })

    const label = el.shadowRoot?.querySelector(".range__label")

    expect(label).toBeTruthy()
    expect(label).toMatchTextContent("Test Label")
  })

  it("renders the label visually hidden when 'hide-label' is set", async () => {
    const el = await defaultFixture({ label: "Test Label", "hide-label": true })

    const label = el.shadowRoot?.querySelector(".range__label")

    expect(label).toBeTruthy()
    expect(label).toMatchTextContent("Test Label")
    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the range labels", async () => {
    const el = await defaultFixture({
      min: 23,
      max: 87,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".range__tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".range__tick-label--max")

    expect(minLabel).toBeTruthy()
    expect(maxLabel).toBeTruthy()

    expect(minLabel).toMatchTextContent("23")
    expect(maxLabel).toMatchTextContent("87")
  })

  it("renders tick marks when 'show-ticks' is set", async () => {
    const el = await defaultFixture({
      min: 0,
      max: 10,
      step: 3,
      "show-ticks": true,
    })

    const ticksContainer = el.shadowRoot?.querySelector(".range__ticks")
    expect(ticksContainer).toBeTruthy()

    const ticks = ticksContainer?.querySelectorAll(".range__tick")
    expect(ticks?.length).toBe(4)
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

    const minLabel = el.shadowRoot?.querySelector(".range__tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".range__tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).toBeTruthy()
    expect(maxLabel).toBeTruthy()
    expect(valueLabel).toBeTruthy()

    expect(minLabel).toMatchTextContent("$25 CHF")
    expect(maxLabel).toMatchTextContent("$75 CHF")
    expect(valueLabel).toMatchTextContent("$50 CHF")
  })

  it("uses custom valueFormatter if provided", async () => {
    const el = await defaultFixture({
      valueFormatter: (value: number) => `Value: ${value}`,
      min: 10,
      max: 90,
      value: 50,
      "show-range-labels": true,
    })

    const minLabel = el.shadowRoot?.querySelector(".range__tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".range__tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).toBeTruthy()
    expect(maxLabel).toBeTruthy()
    expect(valueLabel).toBeTruthy()

    expect(minLabel).toMatchTextContent("Value: 10")
    expect(maxLabel).toMatchTextContent("Value: 90")
    expect(valueLabel).toMatchTextContent("Value: 50")
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

    const minLabel = el.shadowRoot?.querySelector(".range__tick-label--min")
    const maxLabel = el.shadowRoot?.querySelector(".range__tick-label--max")
    const valueLabel = el.shadowRoot?.querySelector("output")

    expect(minLabel).toMatchTextContent("10/11")
    expect(maxLabel).toMatchTextContent("15/16")
    expect(valueLabel).toMatchTextContent("12/13")
  })

  it("disables the range slider", async () => {
    const el = await defaultFixture({ disabled: true })

    const input = el.shadowRoot?.querySelector("[role=slider]")
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("clamps and rounds when value is set", async () => {
    const el = await defaultFixture({ min: 0, max: 10, step: 3 })

    el.value = "8"
    await el.updateComplete

    expect(el.value).toBe("9")
  })

  it("re-normalizes when min/max/step changes", async () => {
    const el = await defaultFixture({ min: 0, max: 10, step: 2 })

    el.value = "9"
    await el.updateComplete

    expect(el.value).toBe("10")

    el.max = 6
    await el.updateComplete

    expect(el.value).toBe("6")
  })

  it("sets the second handle to min when multiple and a single value is provided", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 10,
      max: 100,
      value: 20,
    })

    expect(el.value).toBe("10,20")

    el.value = "30"
    await el.updateComplete
    expect(el.value).toBe("10,30")

    el.value = "30, 40"
    await el.updateComplete
    expect(el.value).toBe("30,40")
  })

  it("re-normalizes both values when multiple and min/max/step changes", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 0,
      max: 10,
      step: 2,
      value: "3,7",
    })

    expect(el.value).toBe("4,8")

    el.max = 6
    await el.updateComplete

    expect(el.value).toBe("4,6")
  })

  it("updates value and emits input on pointer down", async () => {
    const el = await defaultFixture({ min: 0, max: 100, value: 50 })

    const track = el.shadowRoot!.querySelector<HTMLDivElement>("#track")!

    const events: string[] = []
    el.addEventListener("input", () => {
      events.push(el.value)
    })

    await moveMouseToTrackPoint(track, 1)
    await commands.mouseDown()
    await commands.mouseUp()

    await el.updateComplete

    expect(el.value).toBe("100")
    expect(events).toEqual(["100"])
  })

  it("updates while dragging and stops after pointer up", async () => {
    const el = await defaultFixture({ min: 0, max: 100, value: 50 })

    const track = el.shadowRoot!.querySelector<HTMLDivElement>("#track")!

    await moveMouseToTrackPoint(track, 0)
    await commands.mouseDown()
    await el.updateComplete
    expect(el.value).toBe("0")

    await moveMouseToTrackPoint(track, 1)
    await el.updateComplete
    expect(el.value).toBe("100")

    await commands.mouseUp()

    await moveMouseToTrackPoint(track, 0)
    await el.updateComplete
    expect(el.value).toBe("100")
  })

  it("moves the closest thumb on track pointer down in multiple mode", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 0,
      max: 100,
      value: "20,80",
    })

    const track = el.shadowRoot!.querySelector<HTMLDivElement>("#track")!

    await moveMouseToTrackPoint(track, 0.65)
    await commands.mouseDown()
    await commands.mouseUp()

    await el.updateComplete

    const [low, high] = el.value.split(",").map((v) => Number(v))
    expect(low).toBe(20)
    expect(high).toBe(65)
  })

  it("keeps the thumb selected from thumb pointer down while dragging", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 0,
      max: 100,
      value: "20,80",
    })

    const track = el.shadowRoot!.querySelector<HTMLDivElement>("#track")!
    const highThumb = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.range__thumb[data-thumb-index="1"]',
    )!

    await moveMouseToElementPoint(highThumb, 0.5)
    await commands.mouseDown()
    await moveMouseToTrackPoint(track, 0)
    await commands.mouseUp()

    await el.updateComplete
    expect(el.value).toBe("20,0")
  })

  it("updates the focused thumb with keyboard shortcuts", async () => {
    const el = await defaultFixture({ min: 0, max: 10, step: 2, value: 4 })

    await userEvent.tab()

    await userEvent.keyboard("{ArrowRight}")
    await el.updateComplete
    expect(el.value).toBe("6")

    await userEvent.keyboard("{PageUp}")
    await el.updateComplete
    expect(el.value).toBe("10")

    await userEvent.keyboard("{Home}")
    await el.updateComplete
    expect(el.value).toBe("0")
  })

  it("moves only the focused thumb in multiple mode", async () => {
    const el = await defaultFixture({
      multiple: true,
      min: 0,
      max: 100,
      step: 10,
      value: "20,80",
    })

    await userEvent.tab()
    await userEvent.keyboard("{ArrowRight}")
    await el.updateComplete
    expect(el.value).toBe("30,80")

    await userEvent.tab()
    await userEvent.keyboard("{ArrowLeft}")
    await el.updateComplete
    expect(el.value).toBe("30,70")
  })
})
