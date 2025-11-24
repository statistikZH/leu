import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./checkbox.css"
import { FormAssociatedMixin } from "../../lib/mixins/FormAssociatedMixin.js"

/**
 * @tagname leu-checkbox
 */
export class LeuCheckbox extends FormAssociatedMixin(LeuElement) {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  /** @internal */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: Boolean, reflect: true })
  checked: boolean = false

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  @property({ type: String, reflect: true })
  value: string = ""

  willUpdate(changedProperties: PropertyValues<this>): void {
    console.log("willUpdate", changedProperties)
    if (changedProperties.has("checked")) {
      this.setFormValue()
    }
  }

  private handleChange(event: Event & { target: HTMLInputElement }) {
    this.checked = event.target.checked

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  private handleInput(event: InputEvent & { target: HTMLInputElement }) {
    this.checked = event.target.checked
    console.log("handleInput", this.checked)
  }

  public formResetCallback() {
    this.checked = false
  }

  setFormValue() {
    console.log(
      "setFormValue",
      this.checked,
      this.value,
      this.checked ? (this.value ?? "on") : null,
    )
    this.internals.setFormValue(this.checked ? (this.value ?? "on") : null)
  }

  render() {
    return html`
      <input
        id=${`checkbox-${this.name}`}
        class="checkbox"
        type="checkbox"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value ?? ""}
      />
      <label for=${`checkbox-${this.name}`} class="label"><slot></slot></label>
      <leu-icon class="icon" name="check"></leu-icon>
    `
  }
}
