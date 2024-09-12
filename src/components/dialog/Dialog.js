import { html, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { LeuIcon } from "../icon/Icon.js"

// design: https://www.figma.com/design/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=21161-186812&node-type=FRAME

// @ts-ignore
import styles from "./dialog.css"

/**
 * @tagname leu-dialog
 */
export class LeuDialog extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = styles

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  /**
   * @internal
   */
  hasSlotController = new HasSlotController(this, ["toolbar"])

  static properties = {
    label: { type: String },
    sublabel: { type: String },
    open: { type: Boolean, open: true },
  }

  constructor() {
    super()

    /** @type {import("lit/directives/ref").Ref<HTMLDialogElement>} */
    this._dialogRef = createRef()

    /** @type {string} */
    this.label = ""
    /** @type {string} */
    this.sublabel = ""
    /** @type {boolean} */
    this.open = false
  }

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
