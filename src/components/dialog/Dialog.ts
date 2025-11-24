import { html, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { LeuIcon } from "../icon/Icon.js"

import styles from "./dialog.css"

/**
 * @tagname leu-dialog
 */
export class LeuDialog extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: String })
  label: string = ""

  @property({ type: String })
  sublabel: string = ""

  @property({ type: Boolean, reflect: true })
  open: boolean = false

  protected _dialogRef = createRef<HTMLDialogElement>()

  protected hasSlotController = new HasSlotController(this, ["toolbar"])

  show() {
    this._dialogRef.value.showModal()
  }

  close() {
    this._dialogRef.value.close()
  }

  render() {
    const hasActionbar = this.hasSlotController.test("actionbar")

    const closeButtonLabelClasses = {
      "close-button__label": true,
      "close-button__label--hidden": hasActionbar,
    }

    return html`
      <dialog class="dialog" ref=${ref(this._dialogRef)} ?open=${this.open}>
        <div class="content">
          <div class="header">
            <div class="title-wrapper">
              <h1 class="title">${this.label}</h1>
              ${this.sublabel
                ? html`<p class="subtitle">${this.sublabel}</p>`
                : nothing}
            </div>
            <button
              class="close-button"
              @click=${this.close}
              aria-label="Schliessen"
            >
              <span
                class=${classMap(closeButtonLabelClasses)}
                aria-hidden="true"
                >Schliessen</span
              ><leu-icon name="close"> </leu-icon>
            </button>
          </div>
          <slot></slot>
        </div>
        <div class="actionbar">
          <slot name="actionbar"></slot>
        </div>
      </dialog>
    `
  }
}
