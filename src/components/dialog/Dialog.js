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
    label: { type: String },
    rubric: { type: String },
    open: { type: Boolean, open: true },
  }

  constructor() {
    super()

    /** @type {import("lit/directives/ref").Ref<HTMLDialogElement>} */
    this._dialogRef = createRef()

    /** @type {string} */
    this.label = "Label"
    /** @type {string} */
    this.rubric = undefined
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
    return html`
      <dialog ref=${ref(this._dialogRef)} ?open=${this.open}>
        <div class="top">
          <div class="grid gutter-12 justify-between">
            <div class="title-wrapper">
              <h1 class="title">${this.label}</h1>
              ${this.rubric
                ? html`<p class="col-12">${this.rubric}</p>`
                : nothing}
            </div>
            <div class="col-auto">
              ${hasActionbar ? nothing : html`<span>Schliessen</span>`}
              <button @click=${this.close}>
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
        <div class="actionbar grid justify-end">
          <slot name="actionbar"></slot>
        </div>
      </dialog>
    `
  }
}
