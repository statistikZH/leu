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
  required: boolean = false

  @property({ type: Boolean, reflect: true, attribute: "checked" })
  defaultChecked: boolean = false

  protected _checked: boolean

  @property({ type: Boolean, attribute: false })
  set checked(isChecked: boolean) {
    this._checked = isChecked
  }

  get checked(): boolean {
    if (typeof this._checked === "boolean") {
      return this._checked
    }

    return this.defaultChecked
  }

  @property({ type: String, reflect: true })
  value: string

  willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties)
    let checkedChanged = false

    if (
      changedProperties.has("defaultChecked") &&
      !changedProperties.has("checked") &&
      !this.hasInteracted
    ) {
      this.checked = this.defaultChecked
      checkedChanged = true
    }

    if (
      checkedChanged ||
      changedProperties.has("checked") ||
      changedProperties.has("value") ||
      changedProperties.has("name") ||
      changedProperties.has("disabled")
    ) {
      this.setFormValue()
    }
  }

  private handleChange(event: Event & { target: HTMLInputElement }) {
    this.hasInteracted = true
    this.checked = event.target.checked

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  private handleInput(event: InputEvent & { target: HTMLInputElement }) {
    this.hasInteracted = true
    this.checked = event.target.checked
  }

  public formResetCallback() {
    this.checked = this.defaultChecked
    super.formResetCallback()
  }

  setFormValue() {
    this.internals.setFormValue(
      this.checked && !this.disabled ? (this.value ?? "on") : null,
    )

    if (this.required && !this.checked) {
      // @todo i18n and/or custom validation message
      this.internals.setValidity(
        { valueMissing: true },
        "Bitte klicken Sie dieses Kästchen an, um fortfahren zu können.",
      )
    } else {
      this.internals.setValidity({})
    }
  }

  render() {
    return html`
      <input
        id="checkbox"
        class="checkbox"
        type="checkbox"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
        ?required=${this.required}
      />
      <label for="checkbox" class="label"><slot></slot></label>
      <leu-icon class="icon" name="check"></leu-icon>
    `
  }
}
