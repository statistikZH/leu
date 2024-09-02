import { html, nothing } from "lit"
import { createRef, ref } from "lit/directives/ref.js"
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
    heading: { type: String },
    rubric: { type: String },
    open: { type: Boolean, open: true },
  }

  constructor() {
    super()

    /** @internal */
    this._dialogRef = createRef()

    /** @type {string} */
    this.heading = "Heading"
    /** @type {string} */
    this.rubric = undefined
    /** @type {boolean} */
    this.open = false
  }

  _show() {
    // @ts-ignore
    this._dialogRef.value.showModal()
  }

  _close() {
    // @ts-ignore
    this._dialogRef.value.close()
  }

  _keyDown(ev) {
    if (ev.keyCode === 27) {
      // escape key
      this._close()
    }
  }

  render() {
    const hasToolbar = this.hasSlotController.test("toolbar")
    return html`
      <dialog ref=${ref(this._dialogRef)} ?open=${this.open}>
        <div class="top">
          <div class="grid gutter-12 justify-between">
            <div class="title">
              <h1>${this.heading}</h1>
              ${this.rubric
                ? html`<p class="col-12">${this.rubric}</p>`
                : nothing}
            </div>
            <div class="col-auto">
              ${hasToolbar ? nothing : html`<span>Schliessen</span>`}
              <button @click=${this._close}>
                <leu-icon name="close"> </leu-icon>
              </button>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="scroll">
            <slot></slot>
          </div>
        </div>
        <div
          class="toolbar"
          @click=${() => (hasToolbar ? this._close() : null)}
          @keyDown=${() => (hasToolbar ? this._keyDown() : null)}
        >
          <slot name="toolbar"></slot>
        </div>
      </dialog>
    `
  }
}
