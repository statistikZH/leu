import { html, nothing } from "lit"
import { property } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./message.css"
import { LeuIcon } from "../icon/Icon.js"
import { HasSlotController } from "../../lib/hasSlotController.js"

/**
 * @tagname leu-message
 * @cssprop --message-accent-color - Sets the color of the message. According to the design system, it is only allowd for `info`
 * @fires leu:close - Fired when the close button is clicked.
 */
export class LeuMessage extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static dependencies = {
    "leu-icon": LeuIcon,
  }

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

  private hasSlotController = new HasSlotController(this, ["title", "cta"])

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
    const hasTitle = this.hasSlotController.test("title")
    const hasCta = this.hasSlotController.test("cta")
    const classes = classMap({
      message: true,
      "message--filled": this.type === "error" || this.type === "success",
    })

    return html`
      <div class="${classes}">
        ${this.renderIcon()}
        <div class="message__content">
          ${hasTitle
            ? html`<strong><slot name="title"></slot></strong>`
            : nothing}
          <p><slot></slot></p>
        </div>
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
