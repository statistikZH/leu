import { html } from "lit"
import { fixture, expect, elementUpdated, oneEvent } from "@open-wc/testing"

import "../leu-button.js"
import type { LeuButton } from "../leu-button.js"
import "../../icon/leu-icon.js"

async function defaultFixture() {
  return fixture<LeuButton>(html` <leu-button>button</leu-button>`)
}

describe("LeuButton", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-button")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit with no visible text", async () => {
    const el = await fixture(
      html` <leu-button label="sichern">
        <leu-icon name="download"></leu-icon>
      </leu-button>`,
    )

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders the label", async () => {
    const el = await fixture(html` <leu-button>Sichern</leu-button>`)

    expect(el).to.have.trimmed.text("Sichern")
  })

  it("sets the aria-label attribute", async () => {
    const el = await fixture(
      html` <leu-button label="Dokument herunterladen"
        ><leu-icon name="download"></leu-icon
      ></leu-button>`,
    )
    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("aria-label", "Dokument herunterladen")
  })

  it("renders the icon slots at the correct position", async () => {
    const el = await fixture(
      html` <leu-button
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button><div><slot name='before'></slot></div><span><slot></slot></span><div><slot name='after'></slot></div></button>",
      { ignoreAttributes: ["class", "type"] },
    )
  })

  it("renders the expanded icon only when the variant is ghost", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" expanded="true"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).dom.to.equal(
      "<button aria-expanded='true'><div><slot name='before'></slot></div><span><slot></slot></span><div><slot name='after'></slot></div><div class='icon-expanded'><leu-icon name='angleDropDown' size='24'></leu-icon></div></button>",
      { ignoreAttributes: ["class", "type"] },
    )

    el.variant = "primary"

    await elementUpdated(el)

    expect(button).dom.to.equal(
      "<button class='primary regular' aria-expanded='true'><div><slot name='before'></slot></div><span><slot></slot></span><div><slot name='after'></slot></div></button>",
      { ignoreAttributes: ["class", "type"] },
    )
  })

  it("sets the dissabled attrbiute", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" expanded="true" disabled>
        <leu-icon name="addNew" slot="before"></leu-icon>
        Sichern
      </leu-button>`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("disabled")

    el.disabled = false
    await elementUpdated(el)

    expect(button).to.not.have.attribute("disabled")
  })

  it("reflects the role attribute", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" componentRole="menuitemradio"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("role", "menuitemradio")
  })

  it("sets the either checked or selected attribute depending on the role", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" componentRole="menuitemradio" active
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).to.have.attribute("aria-checked", "true")
    expect(button).to.not.have.attribute("aria-selected")

    el.componentRole = "tab"

    await elementUpdated(el)

    expect(button).to.have.attribute("aria-selected", "true")
    expect(button).to.not.have.attribute("aria-checked")

    el.componentRole = "checkbox"
    el.active = false

    await elementUpdated(el)

    expect(button).to.have.attribute("aria-checked", "false")
    expect(button).to.not.have.attribute("aria-selected")

    el.componentRole = undefined
    el.active = true

    await elementUpdated(el)

    expect(button).to.not.have.attribute("aria-checked")
    expect(button).to.not.have.attribute("aria-selected")
  })

  it("dispatches the click event", async () => {
    const el = await fixture<LeuButton>(html` <leu-button>Sichern</leu-button>`)
    const button = el.shadowRoot.querySelector("button")

    setTimeout(() => button.click())

    const event = await oneEvent(el, "click")

    expect(event).to.exist
  })

  describe("form association", () => {
    it("submits the form when type is submit", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form @submit=${(e: Event) => e.preventDefault()}>
          <leu-button type="submit">Submit</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")

      setTimeout(() => button.click())
      const event = await oneEvent(form, "submit")

      expect(event).to.exist
    })

    it("submits the form with the button name and value", async () => {
      let submittedData: FormData | null = null

      const form = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: SubmitEvent) => {
            e.preventDefault()
            submittedData = new FormData(form, e.submitter)
          }}
        >
          <input type="text" name="field" value="test" />
          <leu-button type="submit" name="action" value="save">Save</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")

      setTimeout(() => button.click())
      await oneEvent(form, "submit")

      expect(submittedData).to.not.be.null
      expect(submittedData.get("action")).to.equal("save")
      expect(submittedData.get("field")).to.equal("test")
    })

    it("submits an empty string as value when no value attribute is set", async () => {
      let submittedData: FormData | null = null

      const form = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: SubmitEvent) => {
            e.preventDefault()
            submittedData = new FormData(form, e.submitter)
          }}
        >
          <leu-button type="submit" name="action">Submit</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")

      setTimeout(() => button.click())
      await oneEvent(form, "submit")

      expect(submittedData.get("action")).to.equal("")
    })

    it("resets the form when type is reset", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <input type="text" name="field" value="initial" />
          <leu-button type="reset">Reset</leu-button>
        </form>
      `)

      const input = form.querySelector<HTMLInputElement>("input")
      input.value = "modified"
      expect(input.value).to.equal("modified")

      const button = form.querySelector<LeuButton>("leu-button")
      button.click()

      expect(input.value).to.equal("initial")
    })

    it("does not submit or reset the form when type is button", async () => {
      let submitted = false
      let reset = false

      const form = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: Event) => {
            e.preventDefault()
            submitted = true
          }}
          @reset=${() => {
            reset = true
          }}
        >
          <leu-button type="button">Click</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")
      button.click()

      expect(submitted).to.be.false
      expect(reset).to.be.false
    })

    it("does not submit or reset when the button is not inside a form", async () => {
      const el = await fixture<LeuButton>(
        html`<leu-button type="submit">Submit</leu-button>`,
      )

      // Should not throw
      el.click()
    })

    it("does not submit or reset the form when disabled", async () => {
      let submitted = false
      let reset = false

      const form = await fixture<HTMLFormElement>(html`
        <form
          @submit=${(e: Event) => {
            e.preventDefault()
            submitted = true
          }}
          @reset=${() => {
            reset = true
          }}
        >
          <leu-button type="submit" disabled>Submit</leu-button>
          <leu-button type="reset" disabled>Reset</leu-button>
        </form>
      `)

      const submitBtn = form.querySelectorAll<LeuButton>("leu-button")[0]
      const resetBtn = form.querySelectorAll<LeuButton>("leu-button")[1]

      submitBtn.click()
      resetBtn.click()

      expect(submitted).to.be.false
      expect(reset).to.be.false
    })

    it("is form associated", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-button type="submit" name="btn">Submit</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")

      expect(button.form).to.equal(form)
    })

    it("responds to formDisabledCallback", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <fieldset>
            <leu-button type="submit">Submit</leu-button>
          </fieldset>
        </form>
      `)

      const fieldset = form.querySelector("fieldset")
      const button = form.querySelector<LeuButton>("leu-button")

      expect(button.disabled).to.be.false

      fieldset.disabled = true
      await elementUpdated(button)

      expect(button.disabled).to.be.true
    })
  })
})
