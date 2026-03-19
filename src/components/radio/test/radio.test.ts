import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-radio.js"
import type { LeuRadio } from "../leu-radio.js"

async function defaultFixture() {
  return fixture(html`
    <leu-radio identifier="b" value="3" name="radio-button"
      >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
    >
  `)
}

describe("LeuRadio", () => {
  it("is a defined element", async () => {
    const elRadio = customElements.get("leu-radio")

    await expect(elRadio).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("is not checked by default", async () => {
    const el = await defaultFixture()

    expect(el.checked).to.be.false
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true
  })

  it("sets the checked property when the checkbox", async () => {
    const el = await defaultFixture()
    const label = el.shadowRoot.querySelector("label")

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.true
  })

  it("does not set the checked property when disabled", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")
    const label = el.shadowRoot.querySelector("label")

    el.disabled = true
    await elementUpdated(el)

    checkbox.click()
    await elementUpdated(el)

    expect(el.checked).to.be.false

    label.click()
    await elementUpdated(el)

    expect(el.checked).to.be.false
  })

  it("toggles the checked property when the space key is pressed", async () => {
    const el = await defaultFixture()
    el.focus()

    await sendKeys({
      press: "Space",
    })

    expect(el.checked).to.be.true

    await sendKeys({
      press: "Space",
    })

    expect(el.checked).to.be.true
  })

  it("fires a change event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "change")

    expect(event).to.exist
  })

  it("fires an input event when clicked", async () => {
    const el = await defaultFixture()
    const checkbox = el.shadowRoot.querySelector("input")

    setTimeout(() => checkbox.click())
    const event = await oneEvent(el, "input")

    expect(event).to.exist
  })

  describe("form association", () => {
    it("appends the value to the form data when checked", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2" checked></leu-radio>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("radio")).to.equal("2")
    })

    it("appends 'on' to the form data when checked and no value is set", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" checked></leu-radio>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("radio")).to.equal("on")
    })

    it("does not append the value to the form data when unchecked", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2"></leu-radio>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("radio")).to.be.null
    })

    it("does not append the value to the form data when disabled", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2" checked disabled></leu-radio>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("radio")).to.be.null
    })

    it("resets to the default checked state when the form is reset", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2" checked></leu-radio>
        </form>
      `)

      const radio = form.querySelector<LeuRadio>("leu-radio")
      radio.checked = false
      await elementUpdated(radio)

      form.reset()
      await elementUpdated(radio)

      expect(radio.checked).to.be.true
    })

    it("updates the form data when the value and disabled state changes", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2"></leu-radio>
        </form>
      `)

      const radio = form.querySelector<LeuRadio>("leu-radio")
      radio.checked = true
      await elementUpdated(radio)

      let formData = new FormData(form)
      expect(formData.get("radio")).to.equal("2")

      radio.value = "another_value"
      await elementUpdated(radio)

      formData = new FormData(form)
      expect(formData.get("radio")).to.equal("another_value")

      radio.disabled = true
      await elementUpdated(radio)

      formData = new FormData(form)
      expect(formData.get("radio")).to.be.null
    })

    it("updates the form data when the defaultChecked state changes before any interaction", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2" checked></leu-radio>
        </form>
      `)

      const radio = form.querySelector<LeuRadio>("leu-radio")
      radio.defaultChecked = false
      await elementUpdated(radio)

      let formData = new FormData(form)
      expect(formData.get("radio")).to.be.null

      // Simulate user interaction
      const innerRadio =
        radio.shadowRoot.querySelector<HTMLInputElement>("input")
      innerRadio.click()
      await elementUpdated(radio)

      formData = new FormData(form)
      expect(formData.get("radio")).to.equal("2")

      // This change of defaultChecked should not have an effect since the user has already interacted
      radio.defaultChecked = true
      radio.checked = false
      await elementUpdated(radio)

      formData = new FormData(form)
      expect(formData.get("radio")).to.be.null
    })

    it("should be valid when the required attribute is set and checked", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2" required checked></leu-radio>
        </form>
      `)

      const radio = form.querySelector<LeuRadio>("leu-radio")

      expect(radio.validity.valid).to.be.true
      expect(form.checkValidity()).to.be.true
    })

    it("is form associated", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio name="radio" value="2"></leu-radio>
        </form>
      `)

      const radio = form.querySelector<LeuRadio>("leu-radio")

      expect(radio.form).to.equal(form)
    })

    it("responds to formDisabledCallback", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <fieldset>
            <leu-radio name="radio" value="2"></leu-radio>
          </fieldset>
        </form>
      `)

      const fieldset = form.querySelector("fieldset")
      const radio = form.querySelector<LeuRadio>("leu-radio")

      expect(radio.disabled).to.be.false

      fieldset.disabled = true
      await elementUpdated(radio)

      expect(radio.disabled).to.be.true
    })
  })
})
