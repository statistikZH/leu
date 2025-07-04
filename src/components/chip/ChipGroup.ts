import { html, unsafeStatic } from "lit/static-html.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chip-group.css"

/* Figma https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=131766-248643&mode=design&t=Kjo5VDiqivihn8dh-11 */

export const SELECTION_MODES = Object.freeze({
  single: "single",
  multiple: "multiple",
  none: "none",
})

/**
 * @slot - Place leu-chip-* elements inside this slot
 * @cssproperty --leu-chip-group-gap - The gap between the chips
 * @tagname leu-chip-group
 */
export class LeuChipGroup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static properties = {
    inverted: { type: Boolean, reflect: true },
    selectionMode: { type: String, attribute: "selection-mode", reflect: true },
    headingLevel: { type: Number, attribute: "heading-level", reflect: true },
    label: { type: String, reflect: true },
  }

  constructor() {
    super()

    this.inverted = false
    this.headingLevel = 2
    this.label = ""

    /** @internal */
    this.items = []

    /** @type {"single" | "multiple" | "none"} */
    this.selectionMode = SELECTION_MODES.none
  }

  connectedCallback() {
    super.connectedCallback()

    /**
     * It is technically possible to add an event listener to the host element
     * before it is connected to the dom. In that case the outside event listener would
     * be called before the following event listener. But at this point multiple
     * radio chips could be selected at the same time because `handleInput` hasn't been
     * called yet. That's why we use the capture phase.
     */
    this.addEventListener("input", this.handleInput, { capture: true })
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener("input", this.handleInput, { capture: true })
  }

  get value() {
    return this.items.filter((i) => i.checked).map((i) => i.getValue())
  }

  /**
   * Checks the items with the given values.
   * If the selectionMode is single, only the first item with the given value is checked.
   * @param {string[]} valueList
   */
  set value(valueList) {
    let hasChanged = false

    for (const item of this.items) {
      item.checked = hasChanged ? false : valueList.includes(item.value)

      if (this.selectionMode === SELECTION_MODES.single && item.checked) {
        hasChanged = true
      }
    }
  }

  /**
   * Determines the heading tag of the accordion toggle.
   * The headingLevel shouldn't be used directly to render the heading tag
   * in order to avoid XSS issues.
   * @returns {String} The heading tag of the accordion toggle.
   * @internal
   */
  _getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = this.headingLevel
    }

    return `h${level}`
  }

  /** @internal */
  handleInput = (e) => {
    if (this.selectionMode === SELECTION_MODES.single) {
      this.items.forEach((item) => {
        item.checked = item === e.target // eslint-disable-line no-param-reassign
      })
    }
  }

  /** @internal */
  handleSlotChange = (e) => {
    const slot = e.target
    const items = slot.assignedElements({ flatten: true })

    this.items = items
  }

  render() {
    const hTag = this._getHeadingTag()

    /* The eslint rules don't recognize html import from lit/static-html.js */
    /* eslint-disable lit/binding-positions, lit/no-invalid-html */
    return html`
      ${this.label
        ? html`<${unsafeStatic(hTag)} class="label">
            <span class="label">${this.label}</span>
          </${unsafeStatic(hTag)}>`
        : ""}
      <slot
        class="group"
        part="group"
        @slotchange=${this.handleSlotChange}
      ></slot>
    `
  }
}
