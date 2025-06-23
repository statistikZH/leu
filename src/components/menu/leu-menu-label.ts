import { LeuMenuLabel } from "./MenuLabel.js"

export { LeuMenuLabel }

LeuMenuLabel.define("leu-menu-label")

declare global {
  interface HTMLElementTagNameMap {
    "leu-menu-label": LeuMenuLabel
  }
}
