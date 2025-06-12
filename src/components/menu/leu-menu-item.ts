import { LeuMenuItem } from "./MenuItem.js"

export { LeuMenuItem }

LeuMenuItem.define("leu-menu-item")

declare global {
  interface HTMLElementTagNameMap {
    "leu-menu-item": LeuMenuItem
  }
}
