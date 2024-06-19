import { html } from "lit"
import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
import styles from "./button-group.css"

/**
 * @tagname leu-button-group
 * @slot - Slot for the buttons
 * @prop {string} value - The value of the currenty selected (active) button
 * @fires input - When the value of the group changes by clicking a button
 */
export class LeuButtonGroup extends LeuElement {
  static styles = styles

  constructor() {
    super()

    this._items = []
  }

  /**
   * @param {import("../button/Button").LeuButton} button
   * @returns {string}
   */
  static getButtonValue(button) {
    return button.getAttribute("value") ?? button.innerText.trim()
  }

  get value() {
    const activeButton = this._items.find((item) => item.active)
    return activeButton ? LeuButtonGroup.getButtonValue(activeButton) : null
  }

  set value(newValue) {
    this._items.forEach((item) => {
      /* eslint-disable no-param-reassign */
      item.active = LeuButtonGroup.getButtonValue(item) === newValue
      /* eslint-enable no-param-reassign */
    })
  }

  _handleSlotChange() {
    /**
     * Remove all event listeners that were added before.
     * Just because a slotchange event was fired, it doesn't mean that all of the
     * children of the slot have changed.
     */
    this._items.forEach((item) => {
      item.removeEventListener("click", this._handleButtonClick)
    })

    const slot = this.shadowRoot.querySelector("slot")
    this._items = slot.assignedElements({ flatten: true })

    let foundActiveButtonBefore = false

    this._items.forEach((item) => {
      /* eslint-disable no-param-reassign */
      item.addEventListener("click", () => this._handleButtonClick(item))
      item.componentRole = "menuitemradio"

      /**
       * In case there are multiple active buttons
       * only the first one will be kept active.
       */
      if (item.active && foundActiveButtonBefore) {
        item.active = false
      } else if (item.active) {
        foundActiveButtonBefore = true
      }

      /* eslint-enable no-param-reassign */
    })
  }

  /**
   * @param {import("../button/Button").LeuButton} button
   */
  _handleButtonClick(button) {
    if (!button.active) {
      this.value = LeuButtonGroup.getButtonValue(button)

      this.dispatchEvent(
        new CustomEvent("input", {
          bubbles: true,
          composed: true,
          detail: { value: LeuButtonGroup.getButtonValue(button) },
        })
      )
    }
  }

  render() {
    return html`
      <div role="menubar" class="group">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `
  }
}
