import { html, nothing } from "lit"
import { property } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./message.css"
import { LeuIcon } from "../icon/Icon.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

/**
 * @tagname leu-message
 * @cssprop --leu-message-accent-color - Sets the color of the message. According to the design system, it is only allowd for `info`
 * @slot [default] - The content of the message. The title of the message should marked up with a `<strong>` tag.
 * @slot cta - A call to action button that is only allowed for `size=large`
 * @fires leu:remove - Fired when the close button is clicked.
 */
export class LeuMessage extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * @internal
   */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /**
   * @internal
   */
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  /**
   * @internal
   */
  static iconToTypeMap = {
    info: "getInformation",
    error: "caution",
    success: "confirm",
    warning: "caution",
  }

  /**
   * The type of the message. `error` and `success` will be displayed as filled boxes.
   */
  @property({ type: String, reflect: true })
  type: "error" | "success" | "info" | "warning" = "success"

  /**
   * The size of the message. A call to action button is only allowed for `large` messages.
   */
  @property({ type: String, reflect: true })
  size: "regular" | "large" = "regular"

  /**
   * Wheter the message is removable or not. The component will not remove itself when the close button is clicked.
   */
  @property({ type: Boolean, reflect: true })
  removable: boolean = false

  /**
   * Wheter the message is used as a popup or not. This will add a drop shadow but will not position the message absolutely.
   */
  @property({ type: Boolean, reflect: true })
  popup: boolean = false

  private hasSlotController = new HasSlotController(this, ["cta"])

  protected renderIcon() {
    const name = LeuMessage.iconToTypeMap[this.type]

    return html`<leu-icon class="message__icon" name=${name}></leu-icon>`
  }

  protected handleRemove() {
    this.dispatchEvent(
      new CustomEvent("leu:remove", {
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    const hasCta = this.hasSlotController.test("cta")
    const classes = classMap({
      message: true,
      "message--filled": this.type === "error" || this.type === "success",
      "message--popup": this.popup,
      [`message--${this.size}`]: true,
      [`message--${this.type}`]: true,
    })

    return html`
      <div class="${classes}">
        ${this.renderIcon()}
        <p class="message__content">
          <slot></slot>
        </p>
        ${hasCta
          ? html`<slot class="message__cta" name="cta"></slot>`
          : nothing}
        ${this.removable
          ? html`<button
              class="message__remove"
              aria-label="Meldung schliessen"
              @click=${this.handleRemove}
            >
              <leu-icon class="message__remove-icon" name="close"></leu-icon>
            </button>`
          : nothing}
      </div>
    `
  }
}
