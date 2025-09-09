import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import "../leu-search.js"
import { ifDefined } from "lit/directives/if-defined.js"

interface Args {
  value?: string
  size?: "small" | "regular"
  label?: string
  submitLabel?: string
  submitButton?: boolean
  disabled?: boolean
  clearable?: boolean
}
async function defaultFixture(args: Args = {}): Promise<HTMLInputElement> {
  return fixture(html`
    <leu-search
      value=${ifDefined(args.value)}
      size=${ifDefined(args.size)}
      label=${ifDefined(args.label)}
      submitLabel=${ifDefined(args.submitLabel)}
      ?submitButton=${args.submitButton}
      ?disabled=${args.disabled}
      ?clearable=${args.clearable}
    >
    </leu-search>
    <!-- Firefox needs an other focusable element. Otherwise, sendKeys({press: "Tab"}) will have no effect -->
    <div tabindex="0"></div>
  `) as Promise<HTMLInputElement>
}

describe("LeuSearch", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-search")
    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()
    await expect(el).shadowDom.to.be.accessible()
  })

  it("delegates the focus to the select element", async () => {
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
    const el = await defaultFixture({ label: "Test" })
    const label = el.shadowRoot.querySelector("label")
    expect(label).to.have.text("Test")
  })

  it("passes the defined value to the input element", async () => {
    const el = await defaultFixture({ value: "John" })
    const input = el.shadowRoot.querySelector("input")
    expect(input.value).to.equal("John")
    el.value = "Jane"
    await elementUpdated(el)
    expect(input.value).to.equal("Jane")
  })

  it("renders a clear button", async () => {
    const el = await defaultFixture({ clearable: true })
    let clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).to.not.exist
    el.focus()
    await sendKeys({ type: "John" })
    clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).to.not.be.null
  })

  it("clear button should not appear", async () => {
    const el = await defaultFixture()
    const clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).to.not.exist
  })

  it("renders a submit button", async () => {
    const el = await defaultFixture({ submitButton: true })
    let submitButton = el.shadowRoot.querySelector("leu-button")
    expect(submitButton).to.not.exist
    el.focus()
    await sendKeys({ type: "John" })
    submitButton = el.shadowRoot.querySelector("leu-button")
    expect(submitButton).to.not.be.null
  })

  it("leu:submit event", async () => {
    const el = await defaultFixture({ submitButton: true })
    el.focus()
    await sendKeys({ type: "John" })
    const button = el.shadowRoot.querySelector("leu-button")
    setTimeout(() => button.click())
    const event = await oneEvent(el, "leu:submit", false)
    expect(event).to.exist
    expect(event.detail.value).to.equal("John")
  })
})
