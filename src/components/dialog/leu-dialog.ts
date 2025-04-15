import { LeuDialog } from "./Dialog.js"

export { LeuDialog }

LeuDialog.define("leu-dialog")

declare global {
  interface HTMLElementTagNameMap {
    "leu-dialog": LeuDialog
  }
}
