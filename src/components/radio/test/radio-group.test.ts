import { html } from "lit"
import { fixture, expect, elementUpdated } from "@open-wc/testing"

import "../leu-radio.js"
import "../leu-radio-group.js"
import type { LeuRadio } from "../leu-radio.js"
import { LeuRadioGroup } from "../leu-radio-group.js"

interface FixtureArgs {
  checkedValue?: string
}

async function defaultFixture(args: FixtureArgs = {}) {
  return fixture<LeuRadioGroup>(html`
    <leu-radio-group>
      <span slot="legend">Legende</span>
      <leu-radio
        value="1"
        name="radio-button"
        disabled
        ?checked=${args.checkedValue === "1"}
        >Kurz</leu-radio
      >
      <leu-radio
        value="2"
        name="radio-button"
        ?checked=${args.checkedValue === "2"}
        >Etwas Länger</leu-radio
      >
      <leu-radio
        value="3"
        name="radio-button"
        ?checked=${args.checkedValue === "3"}
        >Ein langes Label um sicher ein umbruch zu erzwingen</leu-radio
      >
    </leu-radio-group>
  `)
}

describe("LeuRadioGroup", () => {
  it("is a defined element", async () => {
    const elRadioGroup = customElements.get("leu-radio-group")

    await expect(elRadioGroup).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("has an empty default value", async () => {
    const el = await defaultFixture()

    expect(el.value).to.equal("")
  })

  it("updates the value when a radio button is checked", async () => {
    const el = await defaultFixture()
    const leuRadio = el.querySelector('leu-radio[value="2"]')
    const radio = leuRadio.shadowRoot.querySelector("input")

    radio.click()

    expect(el.value).to.equal("2")
  })

  it("doesn't allow multiple radio buttons to be checked", async () => {
    const el = await defaultFixture()
    const leuRadio2 = el.querySelector('leu-radio[value="2"]')
    const leuRadio3 = el.querySelector('leu-radio[value="3"]')
    const radio2 = leuRadio2.shadowRoot.querySelector("input")
    const radio3 = leuRadio3.shadowRoot.querySelector("input")

    radio2.click()
    radio3.click()

    expect(el.value).to.equal("3")
    expect(leuRadio2.checked).to.be.false
    expect(leuRadio3.checked).to.be.true
  })

  it("has a default value that reflects the checked radio button", async () => {
    const el = await defaultFixture({ checkedValue: "2" })

    expect(el.value).to.deep.equal("2")
  })

  describe("form association", () => {
    it("submits the checked radio value in form data", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color">Red</leu-radio>
            <leu-radio value="2" name="color" checked>Green</leu-radio>
            <leu-radio value="3" name="color">Blue</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("color")).to.equal("2")
    })

    it("does not submit any value when no radio is checked", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color">Red</leu-radio>
            <leu-radio value="2" name="color">Green</leu-radio>
            <leu-radio value="3" name="color">Blue</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("color")).to.be.null
    })

    it("updates the form data when a different radio is selected", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color">Red</leu-radio>
            <leu-radio value="2" name="color" checked>Green</leu-radio>
            <leu-radio value="3" name="color">Blue</leu-radio>
          </leu-radio-group>
        </form>
      `)

      let formData = new FormData(form)
      expect(formData.get("color")).to.equal("2")

      const radio3 = form.querySelector<LeuRadio>('leu-radio[value="3"]')
      const innerRadio3 = radio3.shadowRoot.querySelector("input")
      innerRadio3.click()
      await elementUpdated(radio3)

      formData = new FormData(form)
      expect(formData.get("color")).to.equal("3")
      // Only one value should be submitted
      expect(formData.getAll("color")).to.have.lengthOf(1)
    })

    it("only submits one value even when switching selection", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color" checked>Red</leu-radio>
            <leu-radio value="2" name="color">Green</leu-radio>
            <leu-radio value="3" name="color">Blue</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const radio2 = form.querySelector<LeuRadio>('leu-radio[value="2"]')
      const innerRadio2 = radio2.shadowRoot.querySelector("input")
      innerRadio2.click()
      await elementUpdated(radio2)

      const radio3 = form.querySelector<LeuRadio>('leu-radio[value="3"]')
      const innerRadio3 = radio3.shadowRoot.querySelector("input")
      innerRadio3.click()
      await elementUpdated(radio3)

      const formData = new FormData(form)
      expect(formData.getAll("color")).to.have.lengthOf(1)
      expect(formData.get("color")).to.equal("3")
    })

    it("does not submit a disabled radio's value", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color" checked disabled>Red</leu-radio>
            <leu-radio value="2" name="color">Green</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("color")).to.be.null
    })

    it("resets all radios to their default checked state on form reset", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="1" name="color">Red</leu-radio>
            <leu-radio value="2" name="color" checked>Green</leu-radio>
            <leu-radio value="3" name="color">Blue</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const group = form.querySelector<LeuRadioGroup>("leu-radio-group")
      const radio1 = form.querySelector<LeuRadio>('leu-radio[value="1"]')
      const radio2 = form.querySelector<LeuRadio>('leu-radio[value="2"]')
      const radio3 = form.querySelector<LeuRadio>('leu-radio[value="3"]')

      // Select a different radio
      const innerRadio3 = radio3.shadowRoot.querySelector("input")
      innerRadio3.click()
      await elementUpdated(radio3)

      expect(group.value).to.equal("3")

      form.reset()
      await elementUpdated(radio2)

      expect(radio1.checked).to.be.false
      expect(radio2.checked).to.be.true
      expect(radio3.checked).to.be.false
      expect(group.value).to.equal("2")
    })

    it("exposes the group value reflecting the checked radio", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-radio-group>
            <leu-radio value="a" name="letter">A</leu-radio>
            <leu-radio value="b" name="letter" checked>B</leu-radio>
          </leu-radio-group>
        </form>
      `)

      const group = form.querySelector<LeuRadioGroup>("leu-radio-group")
      expect(group.value).to.equal("b")

      const formData = new FormData(form)
      expect(formData.get("letter")).to.equal("b")
    })
  })
})
