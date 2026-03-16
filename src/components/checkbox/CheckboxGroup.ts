import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./checkbox-group.css?inline"
import { LeuCheckbox } from "./Checkbox.js"

/**
 *
 * @slot - Place the checkboxes inside the default slot.
 * @tagname leu-checkbox-group
 */
export class LeuCheckboxGroup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * Defines how the checkboxes should be aligned.
   */
  @property({ type: String, reflect: true })
  orientation: "horizontal" | "vertical" = "horizontal"

  /**
   * The label of the checkbox group
   */
  @property({ type: String, reflect: true })
  label?: string

  private items: LeuCheckbox[] = []

  get value() {
    return this.items.filter((i) => i.checked).map((i) => i.value)
  }

  private handleSlotChange() {
    this.items = Array.from(
      this.querySelectorAll(":scope > *:not([slot])"),
    ).filter((el) => el instanceof LeuCheckbox)
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "vertical",
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
