import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./radio-group.css?inline"
import { LeuRadio } from "./Radio.js"

/**
 * @summary Handles a group of radio buttons, allowing only one to be selected at a time. It provides keyboard navigation and manages focus within the group.
 * @slot - Place the radio buttons inside the default slot.
 * @tagname leu-radio-group
 */
export class LeuRadioGroup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * Defines how the radio buttons should be aligned.
   */
  @property({ type: String, reflect: true })
  orientation: "horizontal" | "vertical" = "horizontal"

  /**
   * The label of the radio group
   */
  @property({ type: String, reflect: true })
  label?: string

  /**
   * Index of the radio button that would be focused
   * when the focus moves into the group.
   */
  private currentIndex = 0

  private items: LeuRadio[] = []

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

  private addEventListeners() {
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

  private removeEventListeners() {
    this.removeEventListener("input", this.handleInput, { capture: true })
    this.removeEventListener("focusin", this.handleFocusIn)
    this.removeEventListener("keydown", this.handleKeyDown)
  }

  private handleSlotChange() {
    this.handleItems()
  }

  private handleFocusIn = (e: FocusEvent & { target: LeuRadio }) => {
    this.currentIndex = this.items.indexOf(e.target)
  }

  private handleKeyDown = (e: KeyboardEvent & { target: LeuRadio }) => {
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

  private handleInput = (e: InputEvent & { target: LeuRadio }) => {
    this.items.forEach((item) => {
      item.checked = item === e.target // eslint-disable-line no-param-reassign
    })
  }

  private selectItem(selectingItem: LeuRadio) {
    this.items.forEach((item) => {
      item.checked = item === selectingItem // eslint-disable-line no-param-reassign
    })
  }

  private selectNextItem(startingIndex: number, direction: -1 | 1) {
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

  private setTabIndex() {
    this.items.forEach((item, index) => {
      if (index === this.currentIndex) {
        item.tabIndex = 0 // eslint-disable-line no-param-reassign
      } else {
        item.tabIndex = -1 // eslint-disable-line no-param-reassign
      }
    })
  }

  private handleItems() {
    this.items = Array.from(
      this.querySelectorAll(":scope > *:not([slot])"),
    ).filter((el) => el instanceof LeuRadio)

    this.initializeIndex()
    this.setTabIndex()
  }

  private initializeIndex() {
    const index = this.items.findIndex(
      (item) => item.hasAttribute("checked") && !item.hasAttribute("disabled"),
    )
    const nextEnabledIndex = this.items.findIndex(
      (item) => !item.hasAttribute("disabled"),
    )

    this.currentIndex = index >= 0 ? index : nextEnabledIndex
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "vertical",
    }

    return html`
      <fieldset class=${classMap(fieldsetClasses)}>
        <legend class="legend">${this.label}</legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
