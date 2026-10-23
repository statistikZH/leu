import { html } from "lit"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

import "../leu-button.js"
import type { LeuButton } from "../leu-button.js"
import "../../icon/leu-icon.js"

async function defaultFixture() {
  return fixture<LeuButton>(html` <leu-button>button</leu-button>`)
}

describe("LeuButton", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-button")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit with no visible text", async () => {
    const el = await fixture(
      html` <leu-button label="sichern">
        <leu-icon name="download"></leu-icon>
      </leu-button>`,
    )

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit when rendered as link", async () => {
    const el = await fixture(
      html` <leu-button href="https://datenkatalog.statistik.zh.ch/"
        >Link</leu-button
      >`,
    )

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders the label", async () => {
    const el = await fixture(html` <leu-button>Sichern</leu-button>`)

    expect(el.textContent.trim()).toBe("Sichern")
  })

  it("sets the aria-label attribute", async () => {
    const el = await fixture(
      html` <leu-button label="Dokument herunterladen"
        ><leu-icon name="download"></leu-icon
      ></leu-button>`,
    )
    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("aria-label", "Dokument herunterladen")
  })

  it("renders the icon slots at the correct position", async () => {
    const el = await fixture(
      html` <leu-button
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    const slots = Array.from(button.querySelectorAll("slot"), (s) => s.name)
    expect(slots).toEqual(["before", "", "after"])
  })

  it("renders the expanded icon only when the variant is ghost", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" expanded="true"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(
      button.querySelector(".icon-expanded > leu-icon[name='angleDropDown']"),
    ).toBeTruthy()

    el.variant = "primary"

    await el.updateComplete

    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(button.querySelector(".icon-expanded")).toBeNull()
  })

  it("sets the dissabled attrbiute", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" expanded="true" disabled>
        <leu-icon name="addNew" slot="before"></leu-icon>
        Sichern
      </leu-button>`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("disabled")

    el.disabled = false
    await el.updateComplete

    expect(button).not.toHaveAttribute("disabled")
  })

  it("reflects the role attribute", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" componentRole="menuitemradio"
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("role", "menuitemradio")
  })

  it("sets the either checked or selected attribute depending on the role", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button variant="ghost" componentRole="menuitemradio" active
        ><leu-icon name="addNew" slot="before"></leu-icon>Sichern</leu-button
      >`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("aria-checked", "true")
    expect(button).not.toHaveAttribute("aria-selected")

    el.componentRole = "tab"

    await el.updateComplete

    expect(button).toHaveAttribute("aria-selected", "true")
    expect(button).not.toHaveAttribute("aria-checked")

    el.componentRole = "checkbox"
    el.active = false

    await el.updateComplete

    expect(button).toHaveAttribute("aria-checked", "false")
    expect(button).not.toHaveAttribute("aria-selected")

    el.componentRole = undefined
    el.active = true

    await el.updateComplete

    expect(button).not.toHaveAttribute("aria-checked")
    expect(button).not.toHaveAttribute("aria-selected")
  })

  it("dispatches the click event", async () => {
    const button = await fixture<LeuButton>(
      html` <leu-button>Sichern</leu-button>`,
    )

    setTimeout(() => button.click())

    const event = await oneEvent(button, "click")

    expect(event).toBeTruthy()
  })

  it("disables the button when loading", async () => {
    const el = await fixture<LeuButton>(
      html` <leu-button loading>Sichern</leu-button>`,
    )

    const button = el.shadowRoot.querySelector("button")

    expect(button).toHaveAttribute("disabled")
  })

  it("doesn't dispatch click events when loading", async () => {
    const button = await fixture<LeuButton>(
      html` <leu-button loading>Sichern</leu-button>`,
    )

    let clicked = false

    button.addEventListener("click", () => {
      clicked = true
    })

    button.click()

    expect(clicked).toBe(false)
  })

  it("renders as an anchor when href is set", async () => {
    const el = await fixture(
      html` <leu-button
        href="https://datenkatalog.statistik.zh.ch/"
        target="_blank"
        >Zu den Daten <leu-icon name="link" slot="before"></leu-icon
      ></leu-button>`,
    )

    const anchor = el.shadowRoot.querySelector("a")

    expect(anchor).toBeTruthy()
    expect(anchor).toHaveAttribute(
      "href",
      "https://datenkatalog.statistik.zh.ch/",
    )
    expect(anchor).toHaveAttribute("target", "_blank")
  })

  it("does not set disabled or type attribute on anchor", async () => {
    const el = await fixture(
      html` <leu-button
        href="https://datenkatalog.statistik.zh.ch/"
        disabled
        type="submit"
        >Zu den Daten <leu-icon name="link" slot="before"></leu-icon
      ></leu-button>`,
    )

    const anchor = el.shadowRoot.querySelector("a")

    expect(anchor).toBeTruthy()
    expect(anchor).not.toHaveAttribute("disabled")
    expect(anchor).not.toHaveAttribute("type")
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

      expect(event).toBeTruthy()
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

      expect(submittedData).not.toBeNull()
      expect(submittedData.get("action")).toBe("save")
      expect(submittedData.get("field")).toBe("test")
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

      expect(submittedData.get("action")).toBe("")
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
      expect(input.value).toBe("modified")

      const button = form.querySelector<LeuButton>("leu-button")
      button.click()

      expect(input.value).toBe("initial")
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

      expect(submitted).toBe(false)
      expect(reset).toBe(false)
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

      expect(submitted).toBe(false)
      expect(reset).toBe(false)
    })

    it("is form associated", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-button type="submit" name="btn">Submit</leu-button>
        </form>
      `)

      const button = form.querySelector<LeuButton>("leu-button")

      expect(button.form).toBe(form)
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

      expect(button.disabled).toBe(false)

      fieldset.disabled = true
      await button.updateComplete

      expect(button.disabled).toBe(true)
    })
  })
})
