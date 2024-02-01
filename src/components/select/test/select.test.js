import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"

import "../leu-select.js"
import { MUNICIPALITIES } from "./fixtures.js"

async function defaultFixture(args = {}) {
  return fixture(html`<leu-select
    .options=${args.options}
    label=${ifDefined(args.label)}
    .value=${args.value ?? []}
    ?clearable=${args.clearable}
    ?disabled=${args.disabled}
    ?filterable=${args.filterable}
    ?multiple=${args.multiple}
  >
  </leu-select> `)
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

  it("renders a label", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")

    expect(toggleButton).to.have.trimmed.text("Gemeinde")
  })

  it("doesn't show the list of options by default", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const dialog = el.shadowRoot.querySelector("dialog")

    expect(dialog).to.not.have.attribute("open")
  })

  it("opens the list of options when the toggle button is clicked", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const dialog = el.shadowRoot.querySelector("dialog")
    await elementUpdated(el)

    expect(dialog).to.have.attribute("open")
  })

  it("has a default value of an empty array", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    expect(el.value).to.deep.equal([])
  })

  it("marks the menu item as selected a the value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: "Affoltern am Albis",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = el.shadowRoot.querySelector(
      "leu-menu-item[label='Affoltern am Albis']"
    )

    expect(menuItem).to.have.attribute("active")
    expect(menuItem).to.have.attribute("aria-selected")
  })

  it("shows the clear button when a value is set", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      value: "Affoltern am Albis",
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

    const menuItems = el.shadowRoot.querySelectorAll("leu-menu-item")
    expect(menuItems.length).to.equal(6)
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

    const menuItems = el.shadowRoot.querySelectorAll("leu-menu-item")
    expect(menuItems.length).to.equal(MUNICIPALITIES.length)
  })

  it("renders a message when no options are available", async () => {
    const el = await defaultFixture({
      options: [],
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = el.shadowRoot.querySelector("leu-menu-item")
    expect(menuItem).to.have.attribute("label", "Keine Optionen")
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

    const menuItem = el.shadowRoot.querySelector("leu-menu-item")
    expect(menuItem).to.have.attribute("label", "Keine Resultate")
  })

  it("renders a apply button when multiple selection is allowed", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
      multiple: true,
    })

    const applyButton = el.shadowRoot.querySelector("leu-menu + .apply-button")
    expect(applyButton).to.exist
  })

  it("updates the value when an option is selected", async () => {
    const el = await defaultFixture({
      options: MUNICIPALITIES,
      label: "Gemeinde",
    })

    const toggleButton = el.shadowRoot.querySelector(".select-toggle")
    toggleButton.click()

    const menuItem = el.shadowRoot.querySelector("leu-menu-item[label='Maur']")
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

    el.shadowRoot.querySelector("leu-menu-item[label='Maur']").click()
    el.shadowRoot.querySelector("leu-menu-item[label='Zollikon']").click()

    expect(el.value).to.deep.equal(["Maur", "Zollikon"])
  })
})
