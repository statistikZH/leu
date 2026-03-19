import { html, PropertyValues } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { FormAssociatedMixin } from "../../lib/mixins/FormAssociatedMixin.js"

import styles from "./radio.css?inline"

/**
 * @tagname leu-radio
 */
export class LeuRadio extends FormAssociatedMixin(LeuElement) {
  static styles = [LeuElement.styles, styles]

  /** @internal */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

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

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  @property({ type: String, reflect: true })
  value: string

  @property({ type: String, reflect: true })
  name: string = ""

  willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties)
    let checkedChanged = false

    // Match the bevavior of native checkboxes.
    // Changes to the defaultChecked property only hav an effect
    // if the user has not interacted with the checkbox yet.
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
    this.checked = event.target.checked

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  private handleInput(event: InputEvent & { target: HTMLInputElement }) {
    this.checked = event.target.checked
  }

  formResetCallback(): void {
    super.formResetCallback()
    this.checked = this.defaultChecked
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
        id=${`radio-${this.name}`}
        class="radio"
        type="radio"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value ?? ""}
      />
      <label for=${`radio-${this.name}`} class="label"><slot></slot></label>
    `
  }
}
