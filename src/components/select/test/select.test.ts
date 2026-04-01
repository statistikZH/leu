import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import type { LeuSelect } from "../Select.js"
import "../leu-select.js"
import "../../menu/leu-menu-item.js"
import { MUNICIPALITIES } from "./fixtures.js"

async function defaultFixture(
  args: {
    options?: string[]
    label?: string
    value?: ReadonlyArray<string>
    clearable?: boolean
    disabled?: boolean
    filterable?: boolean
    multiple?: boolean
  } = {},
) {
  const el = await fixture<LeuSelect>(
    html`<leu-select
      label=${ifDefined(args.label)}
      value=${ifDefined(args.value?.join(","))}
      ?clearable=${args.clearable ?? false}
      ?disabled=${args.disabled ?? false}
      ?filterable=${args.filterable ?? false}
      ?multiple=${args.multiple ?? false}
    >
      ${(args.options ?? []).map(
        (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
      )}
    </leu-select> `,
  )

  return el
}

describe("LeuSelect", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-select")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit in the open state", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      open: true,
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("passes the a11y audit when a value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      clearable: true,
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("renders a label", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")

    expect(toggleButton).to.have.trimmed.text("Gemeinde")
  })

  it("doesn't display the popup in the default state", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).to.not.have.attribute("active")
  })

  it("opens the list of options when the toggle button is clicked", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    await elementUpdated(el)

    expect(popup).to.have.attribute("active")
  })

  it("has a default value of an empty array", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    expect(el.value).to.deep.equal([])
  })

  it("marks the menu item as selected if the value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
    })

    await elementUpdated(el)

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))

    const menuItem = menuItems.find(
      (item) => item.textContent === "Affoltern am Albis",
    )

    expect(menuItem).to.have.attribute("active")

    el.value = ["Affoltern a.A."] // This name doesn't match the name in the options
    await elementUpdated(el)

    // The value doesn't match any of the options
    expect(menuItems.every((item) => !item.active)).to.be.true
  })

  it("converts the value to an array if it is a string", async () => {
    const el = await defaultFixture({
      options: ["Option 1", "Option 2", "Option 3"],
      label: "Options",
    })

    el.setAttribute("value", "Option 1, Option 2")
    expect(el.value).to.deep.equal(["Option 1", "Option 2"])

    el.setAttribute("value", "Option 3")
    expect(el.value).to.deep.equal(["Option 3"])

    el.setAttribute("value", "Option 1 Option 2")
    expect(el.value).to.deep.equal(["Option 1 Option 2"])
  })

  it("renders the label of the selected option", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle .value")
    expect(toggleButton).to.have.trimmed.text("Affoltern am Albis")

    el.multiple = true
    await elementUpdated(el)

    expect(toggleButton).to.have.trimmed.text("1 gewählt")

    el.value = ["Affoltern am Albis", "Maur"]
    await elementUpdated(el)
    expect(toggleButton).to.have.trimmed.text("2 gewählt")
  })

  it("shows the clear button when a value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      clearable: true,
    })

    const clearButton = el.shadowRoot.querySelector(".clear-button")

    expect(clearButton).to.exist
  })

  it("renders a input field to filter the options", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const filterInput = el.shadowRoot.querySelector(".select-search")

    expect(filterInput).to.exist
  })

  it("filters the options when the filter input is changed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const filterInput = el.shadowRoot.querySelector(".select-search")
    filterInput.focus()

    await sendKeys({ type: "am albis" })

    const menuItems = el.querySelectorAll("leu-menu-item")
    const visibleMenuItems = Array.from(menuItems).filter(
      (menuItem) => !menuItem.hidden,
    )
    expect(visibleMenuItems.length).to.equal(6)
  })

  it("resets the filter when the filter input is cleared", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const filterInput = el.shadowRoot.querySelector(".select-search")
    filterInput.focus()

    await sendKeys({ type: "am albis" })

    const clearFilterButton =
      filterInput.shadowRoot.querySelector(".clear-button")
    clearFilterButton.click()
    await elementUpdated(el)

    const menuItems = el.querySelectorAll("leu-menu-item")
    const visibleMenuItems = Array.from(menuItems).filter(
      (menuItem) => !menuItem.hidden,
    )

    expect(visibleMenuItems.length).to.equal(MUNICIPALITIES.length)
  })

  it("renders a message when no options are available after filtering", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const filterInput = el.shadowRoot.querySelector(".select-search")
    filterInput.focus()

    await sendKeys({ type: "am albissss" })
    await elementUpdated(el)

    const emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).to.exist
    expect(emptyMessage).to.have.attribute("aria-live", "polite")
    expect(emptyMessage).to.have.trimmed.text("Keine Resultate")
  })

  it("doesn't render a message when no options are available and no filter is set", async () => {
    const el = await defaultFixture({
      options: [],
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).not.to.exist
  })

  it("syncs the state to the menu items when they're updated lazily", async () => {
    const el = await defaultFixture({
      options: [],
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const filterInput = el.shadowRoot.querySelector(".select-search")
    filterInput.focus()

    await sendKeys({ type: "am albis" })
    await elementUpdated(el)

    let emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).to.exist

    const fragment = document.createDocumentFragment()
    MUNICIPALITIES.forEach((option) => {
      const menuItem = document.createElement("leu-menu-item")
      menuItem.textContent = option
      fragment.appendChild(menuItem)
    })

    el.appendChild(fragment)

    // Two calls to elementUpdated are needed because the _hasFilterResults
    // property is set during the updated lifecycle
    await elementUpdated(el)
    await elementUpdated(el)
    emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).to.be.null

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Affoltern am Albis",
    )
    expect(menuItem).to.have.attribute("active")
  })

  it("renders a apply button when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const applyButton = el.shadowRoot.querySelector(".apply-button")
    expect(applyButton).to.exist
  })

  it("closes the popup when the apply button is clicked", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const applyButton = el.shadowRoot.querySelector(".apply-button")
    applyButton.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).to.not.have.attribute("active")
  })

  it("updates the value when an option is selected", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )
    menuItem.click()

    expect(el.value).to.deep.equal(["Maur"])
  })

  it("doesn't allow unselecting the value", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Maur"],
    })
    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )

    menuItem.click()
    expect(el.value).to.deep.equal(["Maur"])
  })

  it("allows unselecting the value when clearable is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Maur"],
      clearable: true,
    })
    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )

    menuItem.click()
    expect(el.value).to.deep.equal([])
  })

  it("allows a value with multiple values", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))

    menuItems.find((item) => item.textContent === "Maur").click()
    menuItems.find((item) => item.textContent === "Zollikon").click()

    expect(el.value).to.deep.equal(["Maur", "Zollikon"])
  })

  it("closes the popup when an item is selected", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Hedingen",
    )
    menuItem.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).to.not.have.attribute("active")
  })

  it("keeps the popup open after selecting an item when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Hedingen",
    )
    menuItem.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).to.not.have.attribute("active")
  })

  it("focuses the filter input when the popup is opened", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    await elementUpdated(el)

    const filterInput = el.shadowRoot.querySelector(".select-search")
    expect(filterInput).to.equal(el.shadowRoot.activeElement)
  })

  it("focuses the first menu item when the popup is opened", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    await elementUpdated(el)

    const menuItems = el.querySelectorAll("leu-menu-item")
    const firstMenuItem = menuItems[0]
    expect(firstMenuItem).to.equal(document.activeElement)
  })

  it("closes the popup when the escape key is pressed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    await sendKeys({ press: "Escape" })

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup.active).to.not.be.true
  })

  it("sets the multipleSelection property on the menu items when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))
    expect(menuItems.every((item) => item.multipleSelection)).to.be.true

    el.multiple = false
    await elementUpdated(el)

    expect(menuItems.every((item) => !item.multipleSelection)).to.be.true
  })

  it("closes the popup when the document is clicked outside the component", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    document.body.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup.active).to.not.be.true
  })

  describe("Form association", () => {
    it("is form-associated", async () => {
      expect(customElements.get("leu-select").formAssociated).to.be.true
    })

    it("submits the selected value in a form", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      el.value = ["Maur"]
      await elementUpdated(el)

      const formData = new FormData(form)
      expect(formData.get("city")).to.equal("Maur")
    })

    it("submits multiple selected values as separate form entries", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?multiple=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      el.value = ["Maur", "Zollikon"]
      await elementUpdated(el)

      const formData = new FormData(form)
      expect(formData.getAll("city")).to.deep.equal(["Maur", "Zollikon"])
    })

    it("submits null when no value is selected", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const formData = new FormData(form)
      expect(formData.get("city")).to.be.null
    })

    it("uses the defaultValue as initial form value", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" value="Maur" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      await elementUpdated(el)

      expect(el.defaultValue).to.deep.equal(["Maur"])
      expect(el.value).to.deep.equal(["Maur"])

      const formData = new FormData(form)
      expect(formData.get("city")).to.equal("Maur")
    })

    it("resets to the defaultValue when the form is reset", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" value="Maur" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      el.value = ["Zollikon"]
      await elementUpdated(el)

      expect(el.value).to.deep.equal(["Zollikon"])

      form.reset()
      await elementUpdated(el)

      expect(el.value).to.deep.equal(["Maur"])
    })

    it("resets to an empty value when no defaultValue is set", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      el.value = ["Maur"]
      await elementUpdated(el)

      form.reset()
      await elementUpdated(el)

      expect(el.value).to.deep.equal([])
    })

    it("updates the form data when the defaultValue changes before any interaction", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" value="Maur" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")

      let formData = new FormData(form)
      expect(formData.get("city")).to.equal("Maur")

      el.defaultValue = ["Zollikon"]
      await elementUpdated(el)

      formData = new FormData(form)
      expect(formData.get("city")).to.equal("Zollikon")
    })

    it("does not override the value when defaultValue changes after interaction", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde">
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector("leu-select")
      // Simulate user interaction
      const toggleButton = el.shadowRoot.querySelector(".select-toggle")
      toggleButton.click()
      const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
        (item) => item.textContent === "Maur",
      )
      menuItem.click()
      await elementUpdated(el)

      expect(el.value).to.deep.equal(["Maur"])

      el.defaultValue = ["Zollikon"]
      await elementUpdated(el)

      // User interaction has occurred, defaultValue change should NOT override value
      expect(el.value).to.deep.equal(["Maur"])
    })

    it("is disabled by the form when the fieldset is disabled", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <fieldset disabled>
            <leu-select name="city" label="Gemeinde">
              ${MUNICIPALITIES.map(
                (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
              )}
            </leu-select>
          </fieldset>
        </form>
      `)

      const el = form.querySelector("leu-select")
      await elementUpdated(el)

      expect(el.disabled).to.be.true
    })
  })

  describe("Validity", () => {
    it("is valid by default", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.checkValidity()).to.be.true
      expect(el.validity.valid).to.be.true
    })

    it("is always valid when not required", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.checkValidity()).to.be.true

      el.value = []
      await elementUpdated(el)
      expect(el.checkValidity()).to.be.true
    })

    it("is invalid when required and no value is selected", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?required=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector<LeuSelect>("leu-select")
      await elementUpdated(el)

      expect(el.checkValidity()).to.be.false
      expect(el.validity.valueMissing).to.be.true
    })

    it("is valid when required and a value is selected", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?required=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector<LeuSelect>("leu-select")
      el.value = ["Maur"]
      await elementUpdated(el)

      expect(el.checkValidity()).to.be.true
      expect(el.validity.valid).to.be.true
    })

    it("becomes invalid when required is set after a value exists and is then cleared", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        value: ["Maur"],
      })

      el.required = true
      await elementUpdated(el)
      expect(el.checkValidity()).to.be.true

      el.value = []
      await elementUpdated(el)
      expect(el.checkValidity()).to.be.false
      expect(el.validity.valueMissing).to.be.true
    })

    it("becomes valid when a value is selected after being required and empty", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?required=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector<LeuSelect>("leu-select")
      await elementUpdated(el)
      expect(el.checkValidity()).to.be.false

      const toggleButton = el.shadowRoot.querySelector(".select-toggle")
      toggleButton.click()
      const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
        (item) => item.textContent === "Maur",
      )
      menuItem.click()
      await elementUpdated(el)

      expect(el.checkValidity()).to.be.true
    })

    it("sets a validation message when required and empty", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?required=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector<LeuSelect>("leu-select")
      await elementUpdated(el)

      expect(el.validationMessage).to.be.a("string").and.not.be.empty
    })

    it("has no validation message when valid", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        value: ["Maur"],
      })
      expect(el.validationMessage).to.equal("")
    })

    it("willValidate is true when not disabled", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.willValidate).to.be.true
    })

    it("willValidate is false when disabled", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        disabled: true,
      })
      expect(el.willValidate).to.be.false
    })

    it("resets validity on form reset", async () => {
      const form = await fixture<HTMLFormElement>(html`
        <form>
          <leu-select name="city" label="Gemeinde" ?required=${true}>
            ${MUNICIPALITIES.map(
              (o) => html`<leu-menu-item>${o}</leu-menu-item>`,
            )}
          </leu-select>
        </form>
      `)

      const el = form.querySelector<LeuSelect>("leu-select")
      el.value = ["Maur"]
      await elementUpdated(el)
      expect(el.checkValidity()).to.be.true

      form.reset()
      await elementUpdated(el)

      // After reset value is empty again, so required makes it invalid
      expect(el.checkValidity()).to.be.false
      expect(el.validity.valueMissing).to.be.true
    })
  })
})
