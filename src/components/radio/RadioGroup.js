import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
import styles from "./radio-group.css"

/**
 * @tagname leu-radio-group
 */
export class LeuRadioGroup extends LeuElement {
  static styles = styles

  static properties = {
    orientation: { type: String, reflect: true },
    label: { type: String, reflect: true },
  }

  constructor() {
    super()
    this.orientation = "HORIZONTAL"
    this._currentIndex = 0
    this.items = []
  }

  get value() {
    const checkedValues = this.items
      .filter((i) => i.checked)
      .map((i) => i.value)
    return checkedValues.length > 0 ? checkedValues[0] : ""
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleItems()
    this.addEventListeners()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListeners()
  }

  addEventListeners() {
    /**
     * It is technically possible to add an event listener to the host element
     * before it is connected to the dom. In that case the outside event listener would
     * be called before the following event listener. But at this point multiple
     * radio buttons could be selected at the same time because `handleInput` hasn't been
     * called yet. That's why we use the capture phase.
     */
    this.addEventListener("input", this.handleInput, { capture: true })
    this.addEventListener("focusin", this.handleFocusIn)
    this.addEventListener("keydown", this.handleKeyDown)
  }

  removeEventListeners() {
    this.removeEventListener("input", this.handleInput, { capture: true })
    this.removeEventListener("focusin", this.handleFocusIn)
    this.removeEventListener("keydown", this.handleKeyDown)
  }

  handleSlotChange() {
    this.handleItems()
  }

  handleFocusIn = (e) => {
    this._currentIndex = this.items.indexOf(e.target)
  }

  handleKeyDown = (e) => {
    const currentIndex = this.items.indexOf(e.target)

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        this.selectNextItem(currentIndex, -1)
        break
      case "ArrowDown":
      case "ArrowRight":
        this.selectNextItem(currentIndex, 1)
        break
      case "Home":
        this.selectItem(this.items.find((item) => !item.disabled))
        break
      case "End":
        this.selectItem(this.items.findLast((item) => !item.disabled))
        break
      default:
    }

    this.setTabIndex()
  }

  handleInput = (e) => {
    this.items.forEach((item) => {
      item.checked = item === e.target // eslint-disable-line no-param-reassign
    })
  }

  selectItem(selectingItem) {
    this.items.forEach((item) => {
      item.checked = item === selectingItem // eslint-disable-line no-param-reassign
    })
  }

  selectNextItem(startingIndex, direction) {
    let selected = false

    for (let index = 0; index < this.items.length; index += 1) {
      const currentIndex =
        (this.items.length + index * direction + startingIndex + direction) %
        this.items.length
      const currentItem = this.items[currentIndex]

      if (!selected && !currentItem.disabled) {
        currentItem.checked = true
        currentItem.focus()
        selected = true
      } else if (selected) {
        currentItem.checked = false
      }
    }
  }

  setTabIndex() {
    this.items.forEach((item, index) => {
      if (index === this._currentIndex) {
        item.tabIndex = "0" // eslint-disable-line no-param-reassign
      } else {
        item.tabIndex = "-1" // eslint-disable-line no-param-reassign
      }
    })
  }

  handleItems() {
    this.items = Array.from(this.querySelectorAll(":scope > *:not([slot])"))
    this.initializeIndex()
    this.setTabIndex()
  }

  initializeIndex() {
    const index = this.items.findIndex(
      (item) => item.hasAttribute("checked") && !item.hasAttribute("disabled")
    )
    const nextEnabledIndex = this.items.findIndex(
      (item) => !item.hasAttribute("disabled")
    )

    this._currentIndex = index >= 0 ? index : nextEnabledIndex
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "VERTICAL",
    }

    return html`
      <fieldset class=${classMap(fieldsetClasses)}>
        <legend class="legend">${this.label}</legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
