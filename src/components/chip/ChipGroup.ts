import { html, unsafeStatic } from "lit/static-html.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chip-group.css?inline"
import { LeuChipSelectable } from "./ChipSelectable.js"

/**
 * @slot - Place leu-chip-* elements inside this slot
 * @cssproperty --leu-chip-group-gap - The gap between the chips
 * @tagname leu-chip-group
 */
export class LeuChipGroup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: Boolean, reflect: true })
  inverted: boolean = false

  @property({ type: String, attribute: "selection-mode", reflect: true })
  selectionMode: "single" | "multiple" | "none" = "none"

  @property({ type: Number, attribute: "heading-level", reflect: true })
  headingLevel: number = 2

  @property({ type: String, reflect: true })
  label: string = ""

  protected selectableItems: Array<LeuChipSelectable> = []

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
    return this.selectableItems
      .filter((i) => i.checked)
      .map((i) => i.getValue())
  }

  /**
   * Checks the items with the given values.
   * If the selectionMode is single, only the first item with the given value is checked.
   */
  set value(valueList: string[]) {
    let hasChanged = false

    for (const item of this.selectableItems) {
      item.checked = hasChanged ? false : valueList.includes(item.value)

      if (this.selectionMode === "single" && item.checked) {
        hasChanged = true
      }
    }
  }

  /**
   * Determines the heading tag of the accordion toggle.
   * The headingLevel shouldn't be used directly to render the heading tag
   * in order to avoid XSS issues.
   * @internal
   */
  protected _getHeadingTag() {
    let level = 2
    if (this.headingLevel > 0 && this.headingLevel < 7) {
      level = this.headingLevel
    }

    return `h${level}`
  }

  protected handleInput = (e: Event & { target: LeuChipSelectable }) => {
    if (this.selectionMode === "single") {
      this.selectableItems.forEach((item) => {
        item.checked = item === e.target // eslint-disable-line no-param-reassign
      })
    }
  }

  protected handleSlotChange = (e: Event & { target: HTMLSlotElement }) => {
    const slot = e.target
    const items = slot
      .assignedElements({ flatten: true })
      .filter((el) => el instanceof LeuChipSelectable)

    this.selectableItems = items
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
