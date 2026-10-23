import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-input.js"
import { LeuInput } from "../leu-input.js"

async function defaultFixture(args = {}) {
  return fixture<LeuInput>(html`
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
      step=${ifDefined(args.step)}
      label=${args.label || "Label"}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?clearable=${args.clearable}
      ?novalidate=${args.novalidate}
    >
    </leu-input>
    <!-- Firefox needs an other focusable element. Otherwise, userEvent.tab() will have no effect -->
    <div tabindex="0"></div>
  `)
}

describe("LeuInput", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-input")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("delegates the focus to the input element", async () => {
    const el = await defaultFixture()

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    expect(el.shadowRoot.activeElement).toBe(input)
  })

  it("can't be focused when disabled", async () => {
    const el = await defaultFixture({ disabled: true })

    el.focus()

    expect(el.shadowRoot.activeElement).toBeNull()
  })

  it("renders the defined label", async () => {
    const el = await defaultFixture({ label: "Vorname" })

    const label = el.shadowRoot.querySelector("label")

    expect(label.textContent).toBe("Vorname")
  })

  it("has type text by default", async () => {
    const el = await defaultFixture()

    expect(el.type).toBe("text")
  })

  it("passes the defined type to the input element", async () => {
    const el = await defaultFixture({ type: "email" })

    const input = el.shadowRoot.querySelector("input")

    expect(input.type).toBe("email")

    el.type = "password"
    await el.updateComplete

    expect(input.type).toBe("password")
  })

  it("passes the defined value to the input element", async () => {
    const el = await defaultFixture({ label: "Vorname", value: "John" })

    const input = el.shadowRoot.querySelector("input")

    expect(input.value).toBe("John")

    el.value = "Jane"
    await el.updateComplete

    expect(input.value).toBe("Jane")
  })

  it("syncs the value property of the input and the value property of the component", async () => {
    const el = await defaultFixture({ label: "Vorname", value: "John" })

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    await userEvent.keyboard("{Backspace}")
    await userEvent.keyboard("{Backspace}")
    await userEvent.keyboard("{Backspace}")
    await userEvent.keyboard("{Backspace}")
    await userEvent.keyboard("Jane")
    await el.updateComplete

    expect(el.value).toBe("Jane")
    expect(input.value).toBe("Jane")
  })

  it("doesn't accept letters when type is set to number", async () => {
    const el = await defaultFixture({ label: "Länge", type: "number" })

    const input = el.shadowRoot.querySelector("input")

    el.focus()

    await userEvent.keyboard("123")
    await el.updateComplete

    expect(el.value).toBe("123")
    expect(input.value).toBe("123")

    await userEvent.keyboard("abc")
    await el.updateComplete

    expect(el.value).not.toBe("123abc")
    expect(input.value).not.toBe("123abc")
  })

  it("fires a change event after losing focus", async () => {
    const el = await defaultFixture({ label: "Vorname" })

    const input = el.shadowRoot.querySelector("input")

    const changeSpy = vi.fn()
    input.addEventListener("change", changeSpy)

    el.focus()

    await userEvent.keyboard("John")
    await userEvent.tab()

    expect(changeSpy).toHaveBeenCalledOnce()
  })

  it("fires a input event while typing ", async () => {
    const el = await defaultFixture({ label: "Vorname", maxlength: 3 })

    const input = el.shadowRoot.querySelector("input")

    const inputSpy = vi.fn()
    input.addEventListener("input", inputSpy)

    el.focus()

    await userEvent.keyboard("John")

    // Should fire 3 times, because maxlength is set to 3
    expect(inputSpy).toHaveBeenCalledTimes(3)
  })

  it("fires a input event while typing ", async () => {})

  it("renders a prefix", async () => {
    const el = await defaultFixture({ label: "Preis", prefix: "CHF" })

    const prefix = el.shadowRoot.querySelector(".prefix")

    expect(prefix).toMatchTextContent("CHF")
  })

  it("renders a suffix", async () => {
    const el = await defaultFixture({ label: "Länge", suffix: "cm" })

    const suffix = el.shadowRoot.querySelector(".suffix")

    expect(suffix).toMatchTextContent("cm")
  })

  it("renders an icon", async () => {
    const _el = await defaultFixture({ label: "Vorname", icon: "user" })
  })

  it("renders a clear button", async () => {
    const el = await defaultFixture({ label: "Vorname", clearable: true })

    let clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).toBeFalsy()

    el.focus()
    await userEvent.keyboard("John")

    clearButton = el.shadowRoot.querySelector(".clear-button")
    expect(clearButton).not.toBeNull()
  })

  it("clears the value when clicking the clear button", async () => {
    const el = await defaultFixture({ label: "Vorname", clearable: true })

    el.focus()

    await userEvent.keyboard("John")
    await el.updateComplete

    const clearButton = el.shadowRoot.querySelector(".clear-button")
    clearButton.click()

    expect(el.value).toBe("")
  })

  it("renders an error message when value is less than min", async () => {
    const el = await defaultFixture({ label: "Länge", min: 10, type: "number" })

    el.focus()

    await userEvent.keyboard("5")
    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders an error message when value greater than max", async () => {
    const el = await defaultFixture({ label: "Länge", max: 10, type: "number" })

    el.focus()

    await userEvent.keyboard("15")
    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders an error message when the value doesn't match the step", async () => {
    const el = await defaultFixture({
      label: "Länge",
      step: 10,
      type: "number",
    })

    el.focus()

    await userEvent.keyboard("15")
    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders an error message when value is shorter than minlength", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      minlength: 3,
    })

    el.focus()

    await userEvent.keyboard("Jo")
    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders an error message when value is longer than maxlength", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      maxlength: 10,
      value: "Andrea Gabathuler",
    })

    el.focus()

    /* Remove the selection, if there is one */
    await userEvent.keyboard("{ArrowRight}")
    /*
     * Trigger an update of the value that is too long.
     * Browser won't allow to type more than maxlength.
     */
    await userEvent.keyboard("{Backspace}")
    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders an error message when value doesn't match pattern", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      pattern: "([A-Z]{2}-)?d{4,5}", // Pseudo zip code e.g. CH-8000 or 8000 or DE-12345
    })

    el.focus()

    await userEvent.keyboard("123")
    await userEvent.tab()
    await el.updateComplete

    let error = el.shadowRoot.querySelector(".error")
    expect(error).not.toBeNull()

    el.value = ""
    await el.updateComplete

    el.focus()

    await userEvent.keyboard("DE-987")
    await userEvent.tab()
    await el.updateComplete

    error = el.shadowRoot.querySelector(".error")
    expect(error).not.toBeNull()
  })

  it("renders an error message when value is required but is empty", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
    })

    el.focus()

    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).not.toBeNull()
  })

  it("renders a custom error message", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      error: "Bitte geben Sie einen Vornamen ein.",
    })

    el.focus()

    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error.textContent.trim()).toBe("Bitte geben Sie einen Vornamen ein.")
  })

  it("resets the error message as soon as value is valid again", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
    })

    el.focus()

    await userEvent.tab()
    await el.updateComplete

    let error = el.shadowRoot.querySelector(".error")
    expect(error).not.toBeNull()

    el.focus()

    await userEvent.keyboard("Jacqueline")
    await userEvent.tab()
    await el.updateComplete

    error = el.shadowRoot.querySelector(".error")
    expect(error).toBeNull()
  })

  it("doesn't render an error message when novalidate is set", async () => {
    const el = await defaultFixture({
      label: "Vorname",
      required: true,
      novalidate: true,
    })

    el.focus()

    await userEvent.tab()
    await el.updateComplete

    const error = el.shadowRoot.querySelector(".error")

    expect(error).toBeNull()
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
    expect(getErrorIcon()).toBeNull()
    expect(getClearButton()).toBeNull()
    expect(getIcon()).not.toBeNull()

    el.focus()
    await userEvent.keyboard("60")

    expect(getErrorIcon()).toBeNull()
    expect(getClearButton()).not.toBeNull()
    expect(getIcon()).toBeNull()

    el.value = ""
    await el.updateComplete

    el.focus()
    await userEvent.keyboard("40")
    await userEvent.tab()
    await el.updateComplete

    expect(getErrorIcon()).not.toBeNull()
    expect(getClearButton()).toBeNull()
    expect(getIcon()).toBeNull()
  })

  it("returns the value as a number when it is possible", async () => {
    const el = await defaultFixture({ label: "Länge", type: "number" })

    expect(el.valueAsNumber).toBeNaN()

    el.focus()

    await userEvent.keyboard("123")

    expect(el.valueAsNumber).toBe(123)

    el.type = "text"
    await el.updateComplete

    el.focus()
    await userEvent.keyboard("abc")

    expect(el.valueAsNumber).toBeNaN()
  })

  it("check input is valid", async () => {
    {
      const el = await defaultFixture({ label: "Länge", type: "number" })
      el.focus()

      await userEvent.keyboard("text")
      expect(el.checkValidity()).toBe(false)

      await el.updateComplete
      const error = el.shadowRoot.querySelector(".error")
      expect(error).not.toBeNull()
    }

    {
      const el = await defaultFixture({ label: "Länge", type: "number" })
      el.focus()

      await userEvent.keyboard("123")
      expect(el.checkValidity()).toBe(true)

      await el.updateComplete
      const error = el.shadowRoot.querySelector(".error")
      expect(error).toBeNull()
    }
  })

  it("returns the defaultValue when no value has been explicitly set", async () => {
    const el = await defaultFixture({ value: "John" })

    expect(el.defaultValue).toBe("John")
    expect(el.value).toBe("John")
  })

  it("value property overrides the defaultValue", async () => {
    const el = await defaultFixture({ value: "John" })

    el.value = "Jane"
    await el.updateComplete

    expect(el.defaultValue).toBe("John")
    expect(el.value).toBe("Jane")
  })

  it("resets to the defaultValue when the form is reset", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-input name="name" value="John" label="Name"></leu-input>
      </form>
    `)

    const input = form.querySelector<LeuInput>("leu-input")
    input.value = "Jane"
    await input.updateComplete

    expect(input.value).toBe("Jane")

    form.reset()
    await input.updateComplete

    expect(input.value).toBe("John")
  })

  it("updates the form data when the defaultValue changes before any interaction", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-input name="name" value="John" label="Name"></leu-input>
      </form>
    `)

    const input = form.querySelector<LeuInput>("leu-input")

    let formData = new FormData(form)
    expect(formData.get("name")).toBe("John")

    // Changing defaultValue before interaction should update the value
    input.defaultValue = "Jane"
    await input.updateComplete

    formData = new FormData(form)
    expect(formData.get("name")).toBe("Jane")
  })

  it("does not update the value when the defaultValue changes after interaction", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-input name="name" label="Name"></leu-input>
        <div tabindex="0"></div>
      </form>
    `)

    const input = form.querySelector<LeuInput>("leu-input")
    input.focus()
    await userEvent.keyboard("John")
    await input.updateComplete

    // User has interacted, changing defaultValue should NOT override the typed value
    input.defaultValue = "Jane"
    await input.updateComplete

    expect(input.value).toBe("John")

    const formData = new FormData(form)
    expect(formData.get("name")).toBe("John")
  })

  it("updates the form data when the value or disabled state changes", async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <leu-input name="name" value="John" label="Name"></leu-input>
      </form>
    `)

    const input = form.querySelector<LeuInput>("leu-input")

    let formData = new FormData(form)
    expect(formData.get("name")).toBe("John")

    input.value = "Jane"
    await input.updateComplete

    formData = new FormData(form)
    expect(formData.get("name")).toBe("Jane")

    input.disabled = true
    await input.updateComplete

    formData = new FormData(form)
    expect(formData.get("name")).toBeNull()
  })
})
