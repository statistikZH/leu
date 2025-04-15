import { LeuPopup } from "./Popup.js"

export { LeuPopup }

LeuPopup.define("leu-popup")

declare global {
  interface HTMLElementTagNameMap {
    "leu-popup": LeuPopup
  }
}
