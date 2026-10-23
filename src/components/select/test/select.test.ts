import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

import type { LeuSelect } from "../Select.js"
import "../leu-select.js"
import "../../menu/leu-menu-item.js"
import { MUNICIPALITIES } from "./fixtures.js"

async function defaultFixture(
  args: {
    options?: ReadonlyArray<string>
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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit in the open state", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    el.click()
    await el.updateComplete

    expect(await axe(el)).toHaveNoViolations()
  })

  it("passes the a11y audit when a value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      clearable: true,
    })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("renders a label", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")

    expect(toggleButton.textContent.trim()).toBe("Gemeinde")
  })

  it("doesn't display the popup in the default state", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).not.toHaveAttribute("active")
  })

  it("opens the list of options when the toggle button is clicked", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    await el.updateComplete

    expect(popup).toHaveAttribute("active")
  })

  it("has a default value of an empty array", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    expect(el.value).toEqual([])
  })

  it("marks the menu item as selected if the value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
    })

    await el.updateComplete

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))

    const menuItem = menuItems.find(
      (item) => item.textContent === "Affoltern am Albis",
    )

    expect(menuItem).toHaveAttribute("active")

    el.value = ["Affoltern a.A."] // This name doesn't match the name in the options
    await el.updateComplete

    // The value doesn't match any of the options
    expect(menuItems.every((item) => !item.active)).toBe(true)
  })

  it("converts the value to an array if it is a string", async () => {
    const el = await defaultFixture({
      options: ["Option 1", "Option 2", "Option 3"],
      label: "Options",
    })

    el.setAttribute("value", "Option 1, Option 2")
    expect(el.value).toEqual(["Option 1", "Option 2"])

    el.setAttribute("value", "Option 3")
    expect(el.value).toEqual(["Option 3"])

    el.setAttribute("value", "Option 1 Option 2")
    expect(el.value).toEqual(["Option 1 Option 2"])
  })

  it("renders the label of the selected option", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle .value")
    expect(toggleButton.textContent.trim()).toBe("Affoltern am Albis")

    el.multiple = true
    await el.updateComplete

    expect(toggleButton.textContent.trim()).toBe("1 gewählt")

    el.value = ["Affoltern am Albis", "Maur"]
    await el.updateComplete
    expect(toggleButton.textContent.trim()).toBe("2 gewählt")
  })

  it("shows the clear button when a value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      clearable: true,
    })

    const clearButton = el.shadowRoot.querySelector(".clear-button")

    expect(clearButton).toBeTruthy()
  })

  it("renders a input field to filter the options", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")

    expect(filterInput).toBeTruthy()
  })

  it("filters the options when the filter input is changed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")
    filterInput.focus()

    await userEvent.keyboard("am albis")

    const menuItems = el.querySelectorAll("leu-menu-item")
    const visibleMenuItems = Array.from(menuItems).filter(
      (menuItem) => !menuItem.hidden,
    )
    expect(visibleMenuItems.length).toBe(6)
  })

  it("resets the filter when the filter input is cleared", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")
    filterInput.focus()

    await userEvent.keyboard("am albis")

    const clearFilterButton =
      filterInput.shadowRoot.querySelector<HTMLButtonElement>(".clear-button")
    clearFilterButton.click()
    await el.updateComplete

    const menuItems = el.querySelectorAll("leu-menu-item")
    const visibleMenuItems = Array.from(menuItems).filter(
      (menuItem) => !menuItem.hidden,
    )

    expect(visibleMenuItems.length).toBe(MUNICIPALITIES.length)
  })

  it("renders a message when no options are available after filtering", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")
    filterInput.focus()

    await userEvent.keyboard("am albissss")
    await el.updateComplete

    const emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).toBeTruthy()
    expect(emptyMessage).toHaveAttribute("aria-live", "polite")
    expect(emptyMessage.textContent.trim()).toBe("Keine Resultate")
  })

  it("doesn't render a message when no options are available and no filter is set", async () => {
    const el = await defaultFixture({
      options: [],
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).toBeFalsy()
  })

  it("syncs the state to the menu items when they're updated lazily", async () => {
    const el = await defaultFixture({
      options: [],
      label: "Gemeinde",
      value: ["Affoltern am Albis"],
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")
    filterInput.focus()

    await userEvent.keyboard("am albis")
    await el.updateComplete

    const emptyMessage = el.shadowRoot.querySelector(".filter-message-empty")
    expect(emptyMessage).toBeTruthy()

    const fragment = document.createDocumentFragment()
    MUNICIPALITIES.forEach((option) => {
      const menuItem = document.createElement("leu-menu-item")
      menuItem.textContent = option
      fragment.appendChild(menuItem)
    })

    el.appendChild(fragment)

    // The _hasFilterResults property is set during the updated lifecycle
    // after the slot change, so the message disappears asynchronously
    await expect
      .poll(() => el.shadowRoot.querySelector(".filter-message-empty"))
      .toBeNull()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Affoltern am Albis",
    )
    expect(menuItem).toHaveAttribute("active")
  })

  it("renders a apply button when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const applyButton = el.shadowRoot.querySelector(".apply-button")
    expect(applyButton).toBeTruthy()
  })

  it("closes the popup when the apply button is clicked", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const applyButton = el.shadowRoot.querySelector(".apply-button")
    applyButton.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).not.toHaveAttribute("active")
  })

  it("updates the value when an option is selected", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )
    menuItem.click()

    expect(el.value).toEqual(["Maur"])
  })

  it("doesn't allow unselecting the value", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Maur"],
    })
    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )

    menuItem.click()
    expect(el.value).toEqual(["Maur"])
  })

  it("allows unselecting the value when clearable is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: ["Maur"],
      clearable: true,
    })
    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Maur",
    )

    menuItem.click()
    expect(el.value).toEqual([])
  })

  it("allows a value with multiple values", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))

    menuItems.find((item) => item.textContent === "Maur").click()
    menuItems.find((item) => item.textContent === "Zollikon").click()

    expect(el.value).toEqual(["Maur", "Zollikon"])
  })

  it("closes the popup when an item is selected", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Hedingen",
    )
    menuItem.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).not.toHaveAttribute("active")
  })

  it("keeps the popup open after selecting an item when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
      (item) => item.textContent === "Hedingen",
    )
    menuItem.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup).not.toHaveAttribute("active")
  })

  it("focuses the filter input when the popup is opened", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      filterable: true,
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    await el.updateComplete

    const filterInput =
      el.shadowRoot.querySelector<HTMLInputElement>(".select-search")
    expect(filterInput).toBe(el.shadowRoot.activeElement)
  })

  it("focuses the first menu item when the popup is opened", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    await el.updateComplete

    const menuItems = el.querySelectorAll("leu-menu-item")
    const firstMenuItem = menuItems[0]
    expect(firstMenuItem).toBe(document.activeElement)
  })

  it("closes the popup when the escape key is pressed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    await userEvent.keyboard("{Escape}")

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup.active).not.toBe(true)
  })

  it("sets the multipleSelection property on the menu items when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const menuItems = Array.from(el.querySelectorAll("leu-menu-item"))
    expect(menuItems.every((item) => item.multipleSelection)).toBe(true)

    el.multiple = false
    await el.updateComplete

    expect(menuItems.every((item) => !item.multipleSelection)).toBe(true)
  })

  it("closes the popup when the document is clicked outside the component", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton =
      el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
    toggleButton.click()

    document.body.click()

    const popup = el.shadowRoot.querySelector("leu-popup")
    expect(popup.active).not.toBe(true)
  })

  describe("Form association", () => {
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
      await el.updateComplete

      const formData = new FormData(form)
      expect(formData.get("city")).toBe("Maur")
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
      await el.updateComplete

      const formData = new FormData(form)
      expect(formData.getAll("city")).toEqual(["Maur", "Zollikon"])
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
      expect(formData.get("city")).toBeNull()
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
      await el.updateComplete

      expect(el.defaultValue).toEqual(["Maur"])
      expect(el.value).toEqual(["Maur"])

      const formData = new FormData(form)
      expect(formData.get("city")).toBe("Maur")
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
      await el.updateComplete

      expect(el.value).toEqual(["Zollikon"])

      form.reset()
      await el.updateComplete

      expect(el.value).toEqual(["Maur"])
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
      await el.updateComplete

      form.reset()
      await el.updateComplete

      expect(el.value).toEqual([])
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
      expect(formData.get("city")).toBe("Maur")

      el.defaultValue = ["Zollikon"]
      await el.updateComplete

      formData = new FormData(form)
      expect(formData.get("city")).toBe("Zollikon")
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
      const toggleButton =
        el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
      toggleButton.click()
      const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
        (item) => item.textContent === "Maur",
      )
      menuItem.click()
      await el.updateComplete

      expect(el.value).toEqual(["Maur"])

      el.defaultValue = ["Zollikon"]
      await el.updateComplete

      // User interaction has occurred, defaultValue change should NOT override value
      expect(el.value).toEqual(["Maur"])
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
      await el.updateComplete

      expect(el.disabled).toBe(true)
    })
  })

  describe("Validity", () => {
    it("is valid by default", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.checkValidity()).toBe(true)
      expect(el.validity.valid).toBe(true)
    })

    it("is always valid when not required", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.checkValidity()).toBe(true)

      el.value = []
      await el.updateComplete
      expect(el.checkValidity()).toBe(true)
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
      await el.updateComplete

      expect(el.checkValidity()).toBe(false)
      expect(el.validity.valueMissing).toBe(true)
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
      await el.updateComplete

      expect(el.checkValidity()).toBe(true)
      expect(el.validity.valid).toBe(true)
    })

    it("becomes invalid when required is set after a value exists and is then cleared", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        value: ["Maur"],
      })

      el.required = true
      await el.updateComplete
      expect(el.checkValidity()).toBe(true)

      el.value = []
      await el.updateComplete
      expect(el.checkValidity()).toBe(false)
      expect(el.validity.valueMissing).toBe(true)
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
      await el.updateComplete
      expect(el.checkValidity()).toBe(false)

      const toggleButton =
        el.shadowRoot.querySelector<HTMLButtonElement>(".select-toggle")
      toggleButton.click()
      const menuItem = Array.from(el.querySelectorAll("leu-menu-item")).find(
        (item) => item.textContent === "Maur",
      )
      menuItem.click()
      await el.updateComplete

      expect(el.checkValidity()).toBe(true)
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
      await el.updateComplete

      expect(el.validationMessage).toBeTypeOf("string")
      expect(el.validationMessage).not.toBe("")
    })

    it("has no validation message when valid", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        value: ["Maur"],
      })
      expect(el.validationMessage).toBe("")
    })

    it("willValidate is true when not disabled", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
      })
      expect(el.willValidate).toBe(true)
    })

    it("willValidate is false when disabled", async () => {
      const el = await defaultFixture({
        options: MUNICIPALITIES,
        label: "Gemeinde",
        disabled: true,
      })
      expect(el.willValidate).toBe(false)
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
      await el.updateComplete
      expect(el.checkValidity()).toBe(true)

      form.reset()
      await el.updateComplete

      // After reset value is empty again, so required makes it invalid
      expect(el.checkValidity()).toBe(false)
      expect(el.validity.valueMissing).toBe(true)
    })
  })
})
