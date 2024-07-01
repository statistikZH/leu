import { html, unsafeStatic } from "lit/static-html.js"

import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
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
  static styles = styles

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

    this.addEventListener("input", this.handleInput)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener("input", this.handleInput)
  }

  get value() {
    return this.items.filter((i) => i.selected).map((i) => i.value)
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
        item.selected = item === e.target // eslint-disable-line no-param-reassign
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
