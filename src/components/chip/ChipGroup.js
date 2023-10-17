import { LitElement, html } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./chip-group.css"

/* Figma https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=131766-248643&mode=design&t=Kjo5VDiqivihn8dh-11 */

export const SELECTION_MODES = {
  single: "single",
  multiple: "multiple",
  none: "none",
}

/**
 * @slot - Place leu-chip-* elements inside this slot
 * @tagname leu-chip-group
 */
export class LeuChipGroup extends LitElement {
  static styles = styles

  static properties = {
    selectionMode: { type: Boolean },
  }

  constructor() {
    super()

    this.inverted = false
    this.items = []
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener("input", this.handleInput)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener("input", this.handleInput)
  }

  handleInput = (e) => {
    const { target } = e
    const { value } = target

    if (this.selectionMode === SELECTION_MODES.single) {
      this.items.forEach((item) => {
        item.checked = item.value === value
      })
    }
  }

  handleSlotChange = (e) => {
    const slot = e.target
    const items = slot.assignedElements({ flatten: true })

    this.items = items
  }

  render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`
  }
}

export function defineChipGroupElements() {
  defineElement("chip-group", LeuChipGroup)
}
