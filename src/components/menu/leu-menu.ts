import { LeuMenu } from "./Menu.js"

export { LeuMenu }

LeuMenu.define("leu-menu")

declare global {
  interface HTMLElementTagNameMap {
    "leu-menu": LeuMenu
  }
}
