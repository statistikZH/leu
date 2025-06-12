import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-select.js"
import "../../menu/leu-menu-item.js"
import { MUNICIPALITIES } from "./fixtures.js"

async function defaultFixture(args = {}) {
  return fixture(
    html`<leu-select
      label=${ifDefined(args.label)}
      .value=${args.value ?? []}
      ?clearable=${args.clearable}
      ?disabled=${args.disabled}
      ?filterable=${args.filterable}
      ?multiple=${args.multiple}
    >
      ${args.options.map((o) => html`<leu-menu-item>${o}</leu-menu-item>`)}
    </leu-select> `,
  )
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
})
