import { html, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"

import styles from "./checkbox-group.css"

/**
 * @tagname leu-checkbox-group
 */
export class LeuCheckboxGroup extends LitElement {
  static styles = styles

  static properties = {
    orientation: { type: String, reflect: true },
    label: { type: String, reflect: true },
  }

  constructor() {
    super()
    this.orientation = "HORIZONTAL"
    this.items = []
  }

  get value() {
    return this.items.filter((i) => i.checked).map((i) => i.value)
  }

  handleSlotChange() {
    this.handleItems()
  }

  handleItems() {
    this.items = [...this.querySelectorAll(":scope > *:not([slot])")]
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "VERTICAL",
    }

    return html`
      <fieldset class=${classMap(fieldsetClasses)}>
        ${this.label
          ? html`<legend class="legend">${this.label}</legend>`
          : html``}
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
