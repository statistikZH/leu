import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { live } from "lit/directives/live.js"
import { createRef, Ref, ref } from "lit/directives/ref.js"
import { property, state } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuIcon } from "../icon/Icon.js"
import { LeuButton } from "../button/Button.js"

import styles from "./search.css"

export const SEARCH_SIZES = {
  SMALL: "small",
  REGULAR: "regular",
} as const

/**
 * A text input element.
 *
 * @fires {CustomEvent} input - Dispatched when the value of the input element changes.
 * @fires {CustomEvent} change - Dispatched when the value of the input element changes and the input element loses focus.
 *
 * @tagname leu-input
 */
export class LeuSearch extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
    "leu-button": LeuButton,
  }

  static styles = [LeuElement.styles, styles]

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /** Disables the input element */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /** Adds a button to clear the input element. */
  @property({ type: Boolean, reflect: true })
  clearable: boolean = false

  /** The value of the input element. */
  @property({ type: String, reflect: true })
  value: string = ""

  /** The label of the input element. */
  @property({ type: String, reflect: true })
  label: string = "Suchen"

  /** The size of the input element. */
  @property({ type: String, reflect: true })
  size: "small" | "regular" = "regular"

  /** Use Submit Button with button leu:submit event */
  @property({ type: Boolean, reflect: true })
  submitButton: boolean = false

  /** The label of the submit button. */
  @property({ type: String, reflect: true })
  submitLabel?: string

  @state()
  private _identifier: string = ""

  private _inputRef: Ref<HTMLInputElement> = createRef()

  /**
   * Method for handling the click event of the wrapper element.
   * Redirect every click on the wrapper to the input element.
   * This is only necessary for click events because the wrapper element
   * looks like the input element. But the actual input field does not
   * completely fill the wrapper element. Keyboard events don't need to be
   * handled because the actual input element is focusable.
   */
  private handleWrapperClick(event: MouseEvent | PointerEvent) {
    if (event.target === event.currentTarget) {
      this._inputRef.value.focus()
    }
  }

  /**
   * Method for handling the change event of the input element.
   * Sets the value property and dispatches a change event so that
   * the event can be handled outside the shadow DOM.
   * @fires {CustomEvent} change
   */
  private handleChange(event: Event & { target: HTMLInputElement }) {
    if (event.target.validity.valid) {
      this.value = event.target.value
    }

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  /**
   * Method for handling the input event of the input element.
   * Sets the value property and dispatches an input event so that
   * the event can be handled outside the shadow DOM.
   * @fires {CustomEvent} input
   */
  private handleInput(event: Event & { target: HTMLInputElement }) {
    this.value = event.target.value

    const customEvent = new CustomEvent("input", {
      bubbles: true,
      composed: true,
    })
    this.dispatchEvent(customEvent)
  }

  /**
   * Method for clearing the input element.
   * Sets the value property to an empty string and dispatches
   * an input and a change event.
   * @fires {CustomEvent} input
   * @fires {CustomEvent} change
   */
  private clear() {
    this.value = ""

    this._inputRef.value.focus()

    this.dispatchEvent(
      new CustomEvent("input", { bubbles: true, composed: true }),
    )
    this.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true }),
    )
  }

  /**
   * Method for getting the id of the input element.
   * If the id attribute is set, the value of the id attribute is returned.
   * Otherwise a random id is generated and returned.
   */
  private getId() {
    const id = this.getAttribute("id")

    if (id !== null && id !== "") {
      return id
    }

    if (this._identifier !== "") {
      return this._identifier
    }

    this._identifier = crypto.randomUUID()
    return this._identifier
  }

  private handleClick() {
    const customEvent = new CustomEvent("leu:submit", {
      bubbles: true,
      composed: true,
      detail: {
        value: this.value,
      },
    })
    this.dispatchEvent(customEvent)
  }

  /**
   * Determines the content that is displayed after the input element.
   * This can be either an icon, a clear button or an error indicator icon.
   */
  private renderClearButton() {
    if (this.clearable && this.value) {
      return html`
        <button
          class="clear-button"
          @click=${this.clear}
          aria-label="Suchfeld zurücksetzen"
          ?disabled=${this.disabled}
        >
          <leu-icon name="close"></leu-icon>
        </button>
        ${!this.submitButton ? html`<div class="separator"></div>` : nothing}
      `
    }

    return nothing
  }

  render() {
    const searchWrapperClasses = {
      "search-wrapper": true,
      "search-wrapper--empty": !this.value,
    }

    /* See the description of the handleWrapperClick method on why this rule is disabled */
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        @click=${this.handleWrapperClick}
        class=${classMap(searchWrapperClasses)}
      >
        <input
          class="search"
          id="search-${this.getId()}"
          type="search"
          @change=${this.handleChange}
          @input=${this.handleInput}
          ?disabled=${this.disabled}
          .value=${live(this.value ?? "")}
          ref=${ref(this._inputRef)}
        />
        <label for="search-${this.getId()}" class="label">${this.label}</label>
        ${this.renderClearButton()}
        ${this.submitButton && this.value
          ? html` <div class="submit-label">
              <leu-button
                variant="secondary"
                size="small"
                @click=${() => this.handleClick()}
              >
                ${this.submitLabel || "Suchen"}
              </leu-button>
            </div>`
          : html`
              <div class="icon">
                <leu-icon name="search"></leu-icon>
              </div>
            `}
      </div>
    `
  }
}
